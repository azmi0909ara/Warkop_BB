"use client";

import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

interface Props {
  item: any;

  increaseQty: (
    id: number
  ) => void;

  decreaseQty: (
    id: number
  ) => void;

  removeItem: (
    id: number
  ) => void;
}

export default function CartItem({
  item,
  increaseQty,
  decreaseQty,
  removeItem,
}: Props) {
  return (
    <div className="bg-[#F8FAFC] border border-blue-50 rounded-2xl p-3 flex items-center gap-3">
      {/* IMAGE */}
      <img
        src={item.image}
        alt={item.name}
        className="w-14 h-14 rounded-xl object-cover"
      />

      {/* INFO */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[13px] text-[#1E293B] truncate">
          {item.name}
        </h3>

        <p className="text-[#2563EB] font-black text-sm mt-1">
          Rp{" "}
          {item.price.toLocaleString()}
        </p>

        {/* QTY */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() =>
              decreaseQty(item.id)
            }
            className="w-7 h-7 rounded-lg bg-white border border-blue-100 flex items-center justify-center hover:bg-blue-50 transition"
          >
            <Minus size={14} />
          </button>

          <span className="text-sm font-bold w-5 text-center">
            {item.qty}
          </span>

          <button
            onClick={() =>
              increaseQty(item.id)
            }
            className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center hover:bg-blue-700 transition"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end justify-between h-full">
        <button
          onClick={() =>
            removeItem(item.id)
          }
          className="text-slate-400 hover:text-red-500 transition"
        >
          <Trash2 size={16} />
        </button>

        <p className="text-sm font-black text-[#1E293B] mt-5">
          Rp{" "}
          {(
            item.price *
            item.qty
          ).toLocaleString()}
        </p>
      </div>
    </div>
  );
}