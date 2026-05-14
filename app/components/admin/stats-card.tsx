"use client";

import {
  TrendingUp,
} from "lucide-react";

interface Props {
  title: string;
  value: string;
  color: string;
}

export default function StatsCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-blue-100 p-4 shadow-md hover:shadow-lg transition duration-300">
      {/* GLOW */}
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#DBEAFE] rounded-full blur-3xl opacity-60" />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* TOP */}
        <div className="flex items-start justify-between mb-4">
          {/* TEXT */}
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-2">
              {title}
            </p>

            <h2
              className={`text-2xl md:text-3xl font-black ${color}`}
            >
              {value}
            </h2>
          </div>

          {/* ICON */}
          <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
            <TrendingUp
              className={color}
              size={18}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />

          <p className="text-[11px] text-slate-400">
            Realtime update
          </p>
        </div>
      </div>
    </div>
  );
}