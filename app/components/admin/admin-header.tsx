"use client";

import {
  LogOut,
  UtensilsCrossed,
  History,
} from "lucide-react";

interface Props {
  email?: string | null;

  onLogout: () => void;

  onMenu: () => void;

  onHistory: () => void;
}

export default function AdminHeader({
  email,
  onLogout,
  onMenu,
  onHistory,
}: Props) {
  return (
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
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
        {/* ADMIN INFO */}
        <div className="bg-white/80 backdrop-blur-md border border-white/50 shadow-md rounded-2xl px-5 py-4">
          <p className="text-sm text-slate-500 mb-1">
            Logged in as
          </p>

          <h3 className="font-semibold text-sm md:text-base break-all">
            {email}
          </h3>
        </div>

        {/* MENU */}
        <button
          onClick={onMenu}
          className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-4 rounded-2xl shadow-md transition flex items-center justify-center gap-3"
        >
          <UtensilsCrossed size={18} />

          <span>
            Manage Menu
          </span>
        </button>

        {/* HISTORY */}
        <button
          onClick={onHistory}
          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-4 rounded-2xl shadow-md transition flex items-center justify-center gap-3"
        >
          <History size={18} />

          <span>
            History
          </span>
        </button>

        {/* LOGOUT */}
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-4 rounded-2xl shadow-md transition flex items-center justify-center gap-3"
        >
          <LogOut size={18} />

          <span>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}