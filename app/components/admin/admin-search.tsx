"use client";

import { Search } from "lucide-react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function AdminSearch({
  search,
  setSearch,
}: Props) {
  return (
    <div className="bg-white/80 backdrop-blur-md border border-white/50 shadow-md rounded-2xl px-5 py-4 mb-6 flex items-center gap-3">
      <Search className="text-[#2563EB]" />

      <input
        type="text"
        placeholder="Cari order, customer, atau meja..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full bg-transparent outline-none"
      />
    </div>
  );
}