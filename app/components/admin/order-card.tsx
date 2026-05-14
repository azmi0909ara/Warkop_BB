"use client";

import {
  Clock3,
  ReceiptText,
} from "lucide-react";

interface Props {
  order: any;
  active: boolean;
  onClick: () => void;
}

export default function OrderCard({
  order,
  active,
  onClick,
}: Props) {
  const statusStyle =
    order.status === "Pending"
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : order.status ===
        "Processing"
      ? "bg-blue-100 text-blue-700 border-blue-200"
      : "bg-green-100 text-green-700 border-green-200";

  const initial =
    order.customerName?.charAt(0) ||
    "W";

  const time =
    order.createdAt
      ?.toDate?.()
      ?.toLocaleTimeString?.([], {
        hour: "2-digit",
        minute: "2-digit",
      }) || "--:--";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-[24px] border transition duration-300 overflow-hidden ${
        active
          ? "bg-white border-[#2563EB] shadow-[0_0_20px_rgba(37,99,235,0.15)]"
          : "bg-white border-blue-100 hover:border-[#2563EB]/40 hover:shadow-lg"
      }`}
    >
      <div className="p-4">
        {/* TOP */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* AVATAR */}
            <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] flex items-center justify-center text-[#2563EB] font-black text-lg shrink-0">
              {initial}
            </div>

            {/* INFO */}
            <div className="min-w-0">
              <h2 className="font-bold text-base truncate">
                {
                  order.customerName
                }
              </h2>

              <p className="text-slate-500 text-xs mt-1">
                {
                  order.orderId
                }
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div
            className={`px-3 py-1.5 rounded-full border text-[11px] font-semibold whitespace-nowrap ${statusStyle}`}
          >
            {order.status}
          </div>
        </div>

        {/* INFO */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#F8FAFC] rounded-2xl p-3">
            <p className="text-[10px] text-slate-400 uppercase mb-1">
              Table
            </p>

            <h3 className="font-bold text-sm">
              {order.table}
            </h3>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-3">
            <p className="text-[10px] text-slate-400 uppercase mb-1">
              People
            </p>

            <h3 className="font-bold text-sm">
              {
                order.people
              }{" "}
              Pax
            </h3>
          </div>
        </div>

        {/* TOTAL */}
        <div className="bg-gradient-to-r from-[#2563EB] to-blue-500 rounded-2xl p-4 text-white">
          <p className="text-xs text-blue-100 mb-1">
            Total Payment
          </p>

          <h2 className="text-xl font-black">
            Rp{" "}
            {order.total.toLocaleString()}
          </h2>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-blue-50 px-4 py-3 flex items-center justify-between bg-[#FCFDFF]">
        <div className="flex items-center gap-2 text-slate-500 text-xs">
          <Clock3 size={14} />

          <span>{time}</span>
        </div>

        <div className="flex items-center gap-2 text-[#2563EB] font-medium text-xs">
          <ReceiptText size={14} />

          <span>
            {
              order.items.length
            }{" "}
            Items
          </span>
        </div>
      </div>
    </button>
  );
}