"use client";

import { AtSign, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2563EB] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        {/* LEFT */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold mb-4">
            <img
              src="/logo.png"
              alt="Biru Bunga Logo"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-md"
            />

            WBB
          </div>

          <p className="text-blue-100 max-w-md leading-relaxed">
            Kerabat Dekat Kamu Sejak 2022 dengan suasana nyaman
            untuk semua momen.
          </p>

          {/* ADMIN BUTTON */}
          <a
            href="/login"
            className="inline-flex items-center gap-2 mt-6 bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-full text-sm font-medium"
          >
            <Shield size={11} />
            Admin 
          </a>
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="font-bold mb-4">
            Follow Us
          </h3>

          <div className="flex gap-4 items-center mb-6">
            <div className="flex gap-3 items-center bg-white/20 px-4 py-3 rounded-full hover:scale-105 transition">
              <AtSign size={18} />

              <p>@webebe01</p>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm text-blue-100">
        © 2025 Warkop Biru Bunga. All rights reserved.
      </div>
    </footer>
  );
}