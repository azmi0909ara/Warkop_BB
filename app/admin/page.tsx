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
} from "firebase/firestore";

import {
  useRouter,
} from "next/navigation";

import {
  signOut,
} from "firebase/auth";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import {
  db,
  auth,
} from "../lib/firebase";

import { useAuth } from "../context/auth-context";

import AdminHeader from "../components/admin/admin-header";
import AdminSearch from "../components/admin/admin-search";
import AdminActions from "../components/admin/admin-actions";
import AdminFilter from "../components/admin/admin-filter";
import OrderList from "../components/admin/order-list";
import OrderDetail from "../components/admin/order-detail";
import StatsCard from "../components/admin/stats-card";

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

  // RESET DETAIL
  useEffect(() => {
    setSelectedOrder(null);
  }, [filterStatus, search]);

  // AUTH
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  // FIREBASE
  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe =
      onSnapshot(
        q,
        (snapshot) => {
          const data =
            snapshot.docs.map(
              (doc) => ({
                firestoreId:
                  doc.id,
                ...doc.data(),
              })
            );

          setOrders(data);
        }
      );

    return () =>
      unsubscribe();
  }, []);

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

          Table:
            order.table,

          People:
            order.people,

          Service:
            order.service,

          Total:
            order.total,

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

  // FILTER
  const filteredOrders =
    orders.filter((order) => {
      const matchStatus =
        filterStatus ===
        "All"
          ? true
          : order.status ===
            filterStatus;

      const keyword =
        search.toLowerCase();

      const matchSearch =
        order.orderId
          ?.toLowerCase()
          .includes(
            keyword
          ) ||
        order.customerName
          ?.toLowerCase()
          .includes(
            keyword
          ) ||
        order.table
          ?.toLowerCase()
          .includes(
            keyword
          );

      return (
        matchStatus &&
        matchSearch
      );
    });

  // STATS
  const pending =
    orders.filter(
      (o) =>
        o.status ===
        "Pending"
    ).length;

  const processing =
    orders.filter(
      (o) =>
        o.status ===
        "Processing"
    ).length;

  const activeOrders =
    pending + processing;

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        Loading...
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="relative bg-[#F8FAFC] min-h-screen overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-200/40 rounded-full blur-3xl" />

      <div className="absolute top-[30%] right-0 w-[350px] h-[350px] bg-sky-200/30 rounded-full blur-3xl" />

      <div className="absolute bottom-0 left-[20%] w-[250px] h-[250px] bg-indigo-200/30 rounded-full blur-3xl" />

      <section className="relative z-10 py-6 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-5">

          {/* HEADER */}
          <AdminHeader
            email={user.email}
            onLogout={
              handleLogout
            }
            onMenu={() =>
              router.push(
                "/admin/menu"
              )
            }
            onHistory={() =>
              router.push(
                "/admin/history"
              )
            }
          />

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
              value={String(
                pending
              )}
              color="text-yellow-500"
            />

            <StatsCard
              title="Processing"
              value={String(
                processing
              )}
              color="text-blue-500"
            />

            <StatsCard
              title="Active Orders"
              value={String(
                activeOrders
              )}
              color="text-green-500"
            />
          </div>

          {/* SEARCH */}
          <AdminSearch
            search={search}
            setSearch={
              setSearch
            }
          />

          {/* ACTION */}
          <AdminActions
            exportToExcel={
              exportToExcel
            }
          />

          {/* FILTER */}
          <AdminFilter
            filterStatus={
              filterStatus
            }
            setFilterStatus={
              setFilterStatus
            }
          />

          {/* MAIN */}
          <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-8">

            {/* ORDER LIST */}
            <OrderList
              orders={
                filteredOrders
              }
              selectedOrder={
                selectedOrder
              }
              setSelectedOrder={
                setSelectedOrder
              }
            />

            {/* DETAIL */}
            <div className="xl:sticky xl:top-6 h-fit">
              {selectedOrder ? (
                <OrderDetail
                  order={
                    selectedOrder
                  }
                />
              ) : (
                <div className="bg-white rounded-[28px] p-10 border border-blue-100 shadow-md text-center">
                  <div className="w-16 h-16 bg-[#EFF6FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    📋
                  </div>

                  <h3 className="text-xl font-bold mb-2">
                    Pilih Pesanan
                  </h3>

                  <p className="text-slate-500">
                    Klik salah satu
                    order untuk
                    melihat detail
                    pesanan
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}