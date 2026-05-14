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

import { Clock3 } from "lucide-react";

import { db } from "../lib/firebase";

export default function KitchenPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({
            firestoreId: doc.id,
            ...doc.data(),
          }))
          .filter(
            (order: any) =>
              order.status !== "Done"
          );

        setOrders(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#1E293B]">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          {/* LEFT */}
          <div>
            <p className="text-[#2563EB] font-medium">
              Warkop Biru Bunga
            </p>

            <h1 className="text-3xl font-bold">
              Kitchen Display
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 bg-[#EFF6FF] px-5 py-3 rounded-2xl">
            <Clock3 className="text-[#2563EB]" />

            <p className="font-medium">
              Live Orders
            </p>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {orders.length === 0 && (
            <div className="bg-white rounded-[30px] p-16 text-center border border-blue-100 shadow-md">
              <h2 className="text-3xl font-bold mb-3">
                Tidak Ada Order
              </h2>

              <p className="text-slate-500">
                Semua pesanan telah selesai 🎉
              </p>
            </div>
          )}

          {/* GRID */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders.map((order) => {
              const statusColor =
                order.status ===
                "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-[#2563EB]";

              return (
                <div
                  key={
                    order.firestoreId
                  }
                  className="bg-white rounded-[30px] p-6 border border-blue-100 shadow-md"
                >
                  {/* TOP */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-slate-500 text-sm mb-1">
                        Order ID
                      </p>

                      <h2 className="text-2xl font-bold">
                        {order.orderId}
                      </h2>
                      <p className="text-slate-500 mt-1">
                        {order.customerName}
                      </p>
                    </div>

                    <div
                      className={`px-4 py-2 rounded-full text-sm font-medium ${statusColor}`}
                    >
                      {order.status}
                    </div>
                  </div>

                  {/* TABLE */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#F8FAFC] rounded-2xl p-4">
                      <p className="text-sm text-slate-500 mb-1">
                        Table
                      </p>

                      <h3 className="font-bold text-lg">
                        {order.table}
                      </h3>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-2xl p-4">
                      <p className="text-sm text-slate-500 mb-1">
                        People
                      </p>

                      <h3 className="font-bold text-lg">
                        {order.people}
                      </h3>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="space-y-3 mb-6">
                    {order.items.map(
                      (
                        item: any,
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="bg-[#F8FAFC] rounded-2xl p-4 flex items-center gap-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 rounded-xl object-cover"
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {item.name}
                            </h3>

                            <p className="text-sm text-slate-500">
                              Qty:{" "}
                              {item.qty}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>

                  {/* TOTAL */}
                  <div className="border-t border-dashed border-slate-300 pt-5 flex justify-between items-center">
                    <p className="font-medium">
                      Total
                    </p>

                    <h2 className="text-2xl font-bold text-[#2563EB]">
                      Rp{" "}
                      {order.total.toLocaleString()}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}