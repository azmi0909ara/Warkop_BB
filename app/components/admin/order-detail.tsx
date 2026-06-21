"use client";

import {
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
} from "firebase/firestore";

import {
  Clock3,
  Trash2,
  User,
  Users,
  Table2,
  ReceiptText,
} from "lucide-react";

import { db } from "../../lib/firebase";

interface Props {
  order: any;
}

export default function OrderDetail({
  order,
}: Props) {
  if (!order) {
    return (
      <div className="bg-white rounded-[20px] p-6 shadow-md border border-blue-100 text-center text-slate-400 text-sm">
        Pilih order terlebih dahulu
      </div>
    );
  }

  // UPDATE STATUS
  const updateStatus = async (
    status: string
  ) => {
    try {
      // DONE -> HISTORY
      if (status === "Done") {
        const {
          firestoreId,
          ...historyData
        } = order;

        await addDoc(
          collection(
            db,
            "history"
          ),
          {
            ...historyData,
            status: "Done",
            finishedAt:
              new Date(),
          }
        );

        await deleteDoc(
          doc(
            db,
            "orders",
            firestoreId
          )
        );

        alert(
          `Order ${order.orderId} berhasil dipindahkan ke History`
        );

        return;
      }

      // UPDATE STATUS BIASA
      const orderRef = doc(
        db,
        "orders",
        order.firestoreId
      );

      await updateDoc(orderRef, {
        status,
      });

      alert(
        `Order ${order.orderId} updated to ${status}`
      );
    } catch (error) {
      console.error(error);

      alert(
        "Gagal update status"
      );
    }
  };

  // DELETE ORDER
  const deleteOrder =
    async () => {
      const confirmDelete =
        confirm(
          `Hapus order ${order.orderId}?`
        );

      if (!confirmDelete)
        return;

      try {
        await deleteDoc(
          doc(
            db,
            "orders",
            order.firestoreId
          )
        );

        alert(
          "Order berhasil dihapus"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Gagal menghapus order"
        );
      }
    };

  const statusStyle =
    order.status === "Pending"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : order.status ===
        "Processing"
      ? "bg-blue-100 text-blue-700 border-blue-200"
      : "bg-green-100 text-green-700 border-green-200";

  const time =
    order.createdAt
      ?.toDate?.()
      ?.toLocaleString?.() ||
    "-";

  return (
    <div className="bg-white rounded-[20px] shadow-lg border border-blue-100 overflow-hidden">
      {/* HERO */}
      <div className="relative bg-gradient-to-r from-[#2563EB] to-blue-500 p-4 md:p-5 text-white overflow-hidden">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/20 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div>
              <p className="text-blue-100 text-[10px] mb-1 uppercase tracking-[0.2em]">
                Order Detail
              </p>

              <h1 className="text-2xl md:text-3xl font-black">
                {order.orderId}
              </h1>

              <div className="flex items-center gap-2 mt-2 text-blue-100 text-[11px]">
                <Clock3 size={12} />
                <span>{time}</span>
              </div>
            </div>

            <div
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold w-fit backdrop-blur-md ${statusStyle}`}
            >
              {order.status}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 md:p-5">
        {/* CUSTOMER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-5">
          <div className="bg-[#F8FAFC] rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] flex items-center justify-center">
                <User
                  className="text-[#2563EB]"
                  size={16}
                />
              </div>

              <div>
                <p className="text-[10px] text-slate-400">
                  Customer
                </p>

                <h3 className="font-bold text-[13px]">
                  {order.customerName}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] flex items-center justify-center">
                <Table2
                  className="text-[#2563EB]"
                  size={16}
                />
              </div>

              <div>
                <p className="text-[10px] text-slate-400">
                  Table
                </p>

                <h3 className="font-bold text-[13px]">
                  {order.table}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#DBEAFE] flex items-center justify-center">
                <Users
                  className="text-[#2563EB]"
                  size={16}
                />
              </div>

              <div>
                <p className="text-[10px] text-slate-400">
                  People
                </p>

                <h3 className="font-bold text-[13px]">
                  {order.people}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER ITEMS */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <ReceiptText
              className="text-[#2563EB]"
              size={16}
            />
            <h2 className="text-lg font-black">
              Order Items
            </h2>
          </div>

          <div className="space-y-2">
            {order.items.map(
              (
                item: any,
                index: number
              ) => (
                <div
                  key={index}
                  className="bg-[#F8FAFC] border border-blue-50 rounded-2xl p-3 flex items-center gap-2"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-[13px]">
                      {item.name}
                    </h3>

                    <p className="text-slate-500 text-[11px]">
                      Qty: {item.qty}
                    </p>
                  </div>

                  <h3 className="font-black text-[#2563EB] text-[12px]">
                    Rp{" "}
                    {(
                      item.price *
                      item.qty
                    ).toLocaleString()}
                  </h3>
                </div>
              )
            )}
          </div>
        </div>

        {/* TOTAL */}
        <div className="bg-gradient-to-r from-[#2563EB] to-blue-500 rounded-[20px] p-4 text-white mb-5">
          <p className="text-blue-100 text-[10px] mb-1 uppercase tracking-wide">
            Total Payment
          </p>

          <h2 className="text-2xl md:text-3xl font-black">
            Rp{" "}
            {order.total.toLocaleString()}
          </h2>
        </div>

        {/* ACTION */}
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() =>
                updateStatus(
                  "Pending"
                )
              }
              className="bg-yellow-100 text-yellow-700 py-2.5 rounded-xl font-semibold text-[12px]"
            >
              Pending
            </button>

            <button
              onClick={() =>
                updateStatus(
                  "Processing"
                )
              }
              className="bg-blue-100 text-blue-700 py-2.5 rounded-xl font-semibold text-[12px]"
            >
              Processing
            </button>

            <button
              onClick={() =>
                updateStatus(
                  "Done"
                )
              }
              className="bg-green-100 text-green-700 py-2.5 rounded-xl font-semibold text-[12px]"
            >
              Done & Archive
            </button>
          </div>

          <button
            onClick={deleteOrder}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-semibold text-[12px] transition flex items-center justify-center gap-2"
          >
            <Trash2 size={14} />
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
}