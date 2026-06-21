"use client";

import { motion } from "framer-motion";

interface Props {
  filterStatus: string;
  setFilterStatus: (
    status: string
  ) => void;
}

export default function AdminFilter({
  filterStatus,
  setFilterStatus,
}: Props) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
      {[
        "All",
        "Pending",
        "Processing",
      ].map((status) => (
        <button
          key={status}
          onClick={() =>
            setFilterStatus(status)
          }
          className={`relative overflow-hidden px-5 py-3 rounded-2xl font-medium whitespace-nowrap ${
            filterStatus === status
              ? "text-white"
              : "bg-white border border-blue-100 text-slate-600"
          }`}
        >
          {filterStatus ===
            status && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-[#2563EB]"
              transition={{
                type: "spring",
                duration: 0.4,
              }}
            />
          )}

          <span className="relative z-10">
            {status}
          </span>
        </button>
      ))}
    </div>
  );
}