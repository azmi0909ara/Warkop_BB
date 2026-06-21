"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import {
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  Search,
  ReceiptText,
  Wallet,
} from "lucide-react";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

import { db } from "../../lib/firebase";

import { useAuth } from "../../context/auth-context";

export default function HistoryPage() {
  const router = useRouter();

  const { user, loading } =
    useAuth();

  const [histories, setHistories] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  // AUTH
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  // GET HISTORY
  useEffect(() => {
    const unsubscribe =
      onSnapshot(
        collection(
          db,
          "history"
        ),
        (snapshot) => {
          const data =
            snapshot.docs.map(
              (doc) => ({
                firestoreId:
                  doc.id,
                ...doc.data(),
              })
            );

          setHistories(data);
        }
      );

    return () =>
      unsubscribe();
  }, []);

  // FILTER
  const filteredHistory =
    histories.filter((item) => {
      const keyword =
        search.toLowerCase();

      return (
        item.orderId
          ?.toLowerCase()
          .includes(
            keyword
          ) ||
        item.customerName
          ?.toLowerCase()
          .includes(
            keyword
          )
      );
    });

  // TOTAL REVENUE
  const totalRevenue =
    histories.reduce(
      (acc, item) =>
        acc +
        (item.total || 0),
      0
    );

  // EXPORT EXCEL
  const exportToExcel =
    () => {
      if (
        histories.length === 0
      ) {
        alert(
          "Belum ada history"
        );
        return;
      }

      const exportData =
        histories.map(
          (history) => ({
            OrderID:
              history.orderId,

            Customer:
              history.customerName,

            Table:
              history.table,

            People:
              history.people,

            Service:
              history.service,

            Total:
              history.total,

            Status:
              history.status,

            FinishedAt:
              history.finishedAt
                ?.toDate?.()
                ?.toLocaleString?.() ||
              "-",
          })
        );

      const worksheet =
        XLSX.utils.json_to_sheet(
          exportData
        );

      const workbook =
        XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "History"
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
        `history-${Date.now()}.xlsx`
      );
    };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="max-w-7xl mx-auto px-4 md:px-5 py-6 md:py-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-[#2563EB] uppercase tracking-[0.2em] text-sm mb-2">
              Warkop Biru Bunga
            </p>

            <h1 className="text-4xl font-black">
              Order History
            </h1>

            <p className="text-slate-500 mt-2">
              Riwayat transaksi
              yang telah selesai
            </p>
          </div>

          <button
            onClick={() =>
              router.push(
                "/admin"
              )
            }
            className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow-md"
          >
            <ArrowLeft
              size={18}
            />
            Dashboard
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="bg-white rounded-[24px] p-5 shadow-md border border-blue-100">
            <div className="flex items-center gap-3">
              <ReceiptText className="text-[#2563EB]" />

              <div>
                <p className="text-slate-500 text-sm">
                  Total Orders
                </p>

                <h2 className="text-3xl font-black">
                  {
                    histories.length
                  }
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[24px] p-5 shadow-md border border-blue-100">
            <div className="flex items-center gap-3">
              <Wallet className="text-green-500" />

              <div>
                <p className="text-slate-500 text-sm">
                  Total Revenue
                </p>

                <h2 className="text-3xl font-black text-green-600">
                  Rp{" "}
                  {totalRevenue.toLocaleString()}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-md px-5 py-4 mb-5 flex items-center gap-3">
          <Search className="text-[#2563EB]" />

          <input
            type="text"
            placeholder="Cari order atau customer..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full outline-none bg-transparent"
          />
        </div>

        {/* ACTION */}
        <div className="mb-6">
          <button
            onClick={
              exportToExcel
            }
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl shadow-md"
          >
            Export Excel
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[28px] shadow-md border border-blue-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-[#EFF6FF] text-left">
                  <th className="p-4">
                    Order ID
                  </th>

                  <th className="p-4">
                    Customer
                  </th>

                  <th className="p-4">
                    Table
                  </th>

                  <th className="p-4">
                    Service
                  </th>

                  <th className="p-4">
                    Total
                  </th>

                  <th className="p-4">
                    Finished At
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredHistory.map(
                  (
                    history
                  ) => (
                    <tr
                      key={
                        history.firestoreId
                      }
                      className="border-t"
                    >
                      <td className="p-4 font-semibold">
                        {
                          history.orderId
                        }
                      </td>

                      <td className="p-4">
                        {
                          history.customerName
                        }
                      </td>

                      <td className="p-4">
                        {
                          history.table
                        }
                      </td>

                      <td className="p-4">
                        {
                          history.service
                        }
                      </td>

                      <td className="p-4 font-bold text-green-600">
                        Rp{" "}
                        {history.total?.toLocaleString()}
                      </td>

                      <td className="p-4">
                        {history.finishedAt
                          ?.toDate?.()
                          ?.toLocaleString?.() ||
                          "-"}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {filteredHistory.length ===
            0 && (
            <div className="p-10 text-center text-slate-400">
              Belum ada history
            </div>
          )}
        </div>
      </section>
    </main>
  );
}