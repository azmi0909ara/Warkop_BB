"use client";

interface Props {
  exportToExcel: () => void;
}

export default function AdminActions({
  exportToExcel,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-5">
      <button
        onClick={exportToExcel}
        className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-md transition font-medium"
      >
        Export Excel
      </button>

    </div>
  );
}