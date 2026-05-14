"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";

import {
  useRouter,
} from "next/navigation";

import {
  signOut,
} from "firebase/auth";

import {
  LogOut,
  Search,
} from "lucide-react";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

import { useAuth } from "../context/auth-context";

import StatsCard from "../components/admin/stats-card";
import OrderCard from "../components/admin/order-card";
import OrderDetail from "../components/admin/order-detail";

import {
  db,
  auth,
} from "../lib/firebase";

export default function AdminPage() {
  const router = useRouter();

  const { user, loading } =
    useAuth();

  const [orders, setOrders] =
    useState<any[]>([]);

  const [selectedOrder, setSelectedOrder] =
    useState<any>(null);

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [search, setSearch] =
    useState("");

  // LOGOUT
  const handleLogout =
    async () => {
      try {
        await signOut(auth);

        router.push("/login");
      } catch (error) {
        console.error(error);

        alert("Gagal logout");
      }
    };

  // CLEAR DONE ORDERS
  const clearDoneOrders =
    async () => {
      const doneOrders =
        orders.filter(
          (order) =>
            order.status === "Done"
        );

      if (
        doneOrders.length === 0
      ) {
        alert(
          "Tidak ada order selesai"
        );
        return;
      }

      const confirmClear =
        confirm(
          `Hapus ${doneOrders.length} order selesai?`
        );

      if (!confirmClear) return;

      try {
        await Promise.all(
          doneOrders.map((order) =>
            deleteDoc(
              doc(
                db,
                "orders",
                order.firestoreId
              )
            )
          )
        );

        alert(
          "Order selesai berhasil dibersihkan"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Gagal menghapus order selesai"
        );
      }
    };

  // EXPORT EXCEL
  const exportToExcel =
    () => {
      if (orders.length === 0) {
        alert(
          "Belum ada order"
        );
        return;
      }

      const exportData =
        orders.map((order) => ({
          "Order ID":
            order.orderId,

          Customer:
            order.customerName,

          Table: order.table,

          People:
            order.people,

          Service:
            order.service,

          Total: order.total,

          Status:
            order.status,

          Date:
            order.createdAt
              ?.toDate?.()
              ?.toLocaleString?.() ||
            "-",
        }));

      const worksheet =
        XLSX.utils.json_to_sheet(
          exportData
        );

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Orders"
      );

      const excelBuffer =
        XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });

      const fileData =
        new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });

      saveAs(
        fileData,
        `orders-${Date.now()}.xlsx`
      );
    };

  // AUTH PROTECTION
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  // REALTIME FIREBASE
  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(
          (doc) => ({
            firestoreId: doc.id,
            ...doc.data(),
          })
        );

        setOrders(data);

        if (
          data.length > 0 &&
          !selectedOrder
        ) {
          setSelectedOrder(data[0]);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // LOADING
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />

          <p className="text-slate-500">
            Loading...
          </p>
        </div>
      </main>
    );
  }

  // NOT LOGIN
  if (!user) {
    return null;
  }

  // FILTER + SEARCH
  const filteredOrders =
    orders.filter((order) => {
      const matchStatus =
        filterStatus === "All"
          ? true
          : order.status ===
            filterStatus;

      const keyword =
        search.toLowerCase();

      const matchSearch =
        order.orderId
          ?.toLowerCase()
          .includes(keyword) ||
        order.customerName
          ?.toLowerCase()
          .includes(keyword) ||
        order.table
          ?.toLowerCase()
          .includes(keyword);

      return (
        matchStatus &&
        matchSearch
      );
    });

  // STATS
  const pending =
    orders.filter(
      (o) => o.status === "Pending"
    ).length;

  const processing =
    orders.filter(
      (o) =>
        o.status === "Processing"
    ).length;

  const done =
    orders.filter(
      (o) => o.status === "Done"
    ).length;

  return (
    <main className="bg-[#F8FAFC] min-h-screen text-[#1E293B] overflow-hidden">
      <section className="py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-5">
          {/* HEADER */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-8">
            {/* LEFT */}
            <div>
              <p className="text-[#2563EB] font-medium mb-2 tracking-[0.2em] uppercase text-sm">
                Warkop Biru Bunga
              </p>

              <h1 className="text-3xl md:text-5xl font-black leading-tight">
                Admin Dashboard
              </h1>

              <p className="text-slate-500 mt-3 text-sm md:text-base">
                Kelola order realtime cafe
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full xl:w-auto">
              {/* ADMIN INFO */}
              <div className="bg-white border border-blue-100 shadow-md rounded-2xl px-5 py-4 w-full sm:w-auto">
                <p className="text-sm text-slate-500 mb-1">
                  Logged in as
                </p>

                <h3 className="font-semibold text-sm md:text-base break-all">
                  {user.email}
                </h3>
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-4 rounded-2xl shadow-md transition flex items-center justify-center gap-3"
              >
                <LogOut size={18} />

                <span>
                  Logout
                </span>
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <StatsCard
              title="Total Orders"
              value={String(
                orders.length
              )}
              color="text-[#2563EB]"
            />

            <StatsCard
              title="Pending"
              value={String(pending)}
              color="text-yellow-500"
            />

            <StatsCard
              title="Processing"
              value={String(processing)}
              color="text-blue-500"
            />

            <StatsCard
              title="Done"
              value={String(done)}
              color="text-green-500"
            />
          </div>

          {/* SEARCH */}
          <div className="bg-white border border-blue-100 shadow-md rounded-2xl px-5 py-4 mb-6 flex items-center gap-3">
            <Search className="text-[#2563EB] min-w-[20px]" />

            <input
              type="text"
              placeholder="Cari order, customer, atau meja..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full bg-transparent outline-none text-[#1E293B] placeholder:text-slate-400 text-sm md:text-base"
            />
          </div>

          {/* ACTION */}
          <div className="flex flex-col md:flex-row gap-3 mb-5">
            <button
              onClick={exportToExcel}
              className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-md transition font-medium w-full md:w-auto"
            >
              Export Excel
            </button>

            <button
              onClick={
                clearDoneOrders
              }
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl shadow-md transition font-medium w-full md:w-auto"
            >
              Clear Done Orders
            </button>
          </div>

          {/* FILTER */}
          <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
            {[
              "All",
              "Pending",
              "Processing",
              "Done",
            ].map((status) => (
              <button
                key={status}
                onClick={() =>
                  setFilterStatus(
                    status
                  )
                }
                className={`px-5 py-3 rounded-2xl whitespace-nowrap transition font-medium text-sm md:text-base ${
                  filterStatus ===
                  status
                    ? "bg-[#2563EB] text-white shadow-md"
                    : "bg-white border border-blue-100 text-slate-600 hover:border-[#2563EB]"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* MAIN */}
          <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6 xl:gap-8">
            {/* LEFT */}
            <div className="space-y-5 order-2 xl:order-1">
              {/* EMPTY */}
              {filteredOrders.length ===
                0 && (
                <div className="bg-white rounded-[28px] p-10 text-center shadow-md border border-blue-100 text-slate-400">
                  Belum ada order
                </div>
              )}

              {/* ORDER LIST */}
              {filteredOrders.map(
                (order) => (
                  <OrderCard
                    key={
                      order.firestoreId
                    }
                    order={order}
                    active={
                      selectedOrder?.firestoreId ===
                      order.firestoreId
                    }
                    onClick={() =>
                      setSelectedOrder(
                        order
                      )
                    }
                  />
                )
              )}
            </div>

            {/* RIGHT */}
            <div className="order-1 xl:order-2 xl:sticky xl:top-6 h-fit">
              <OrderDetail
                order={selectedOrder}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}