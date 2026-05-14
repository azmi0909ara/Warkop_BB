"use client";

import {
  User,
  Table2,
  Users,
  UtensilsCrossed,
} from "lucide-react";

interface Props {
  customerName: string;
  setCustomerName: (
    value: string
  ) => void;

  table: string;
  setTable: (
    value: string
  ) => void;

  people: string;
  setPeople: (
    value: string
  ) => void;

  service: string;
  setService: (
    value: string
  ) => void;
}

export default function TableSelector({
  customerName,
  setCustomerName,
  table,
  setTable,
  people,
  setPeople,
  service,
  setService,
}: Props) {
  return (
    <div className="relative overflow-hidden bg-white border border-blue-100 rounded-[28px] shadow-lg p-5 md:p-6 mb-6">
      {/* GLOW */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#DBEAFE] rounded-full blur-3xl opacity-70" />

      {/* CONTENT */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="mb-6">
          <p className="text-[#2563EB] text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            Warkop Biru Bunga
          </p>

          <p className="text-slate-500 text-sm mt-2">
            Silahkan isi informasi
            pemesanan terlebih
            dahulu
          </p>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* CUSTOMER */}
          <div className="bg-[#F8FAFC] border border-blue-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <User
                className="text-[#2563EB]"
                size={16}
              />

              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Customer
              </p>
            </div>

            <input
              type="text"
              placeholder="Nama pemesan"
              value={customerName}
              onChange={(e) =>
                setCustomerName(
                  e.target.value
                )
              }
              className="w-full bg-transparent outline-none text-sm text-[#1E293B] placeholder:text-slate-400"
            />
          </div>

          {/* TABLE */}
          <div className="bg-[#F8FAFC] border border-blue-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Table2
                className="text-[#2563EB]"
                size={16}
              />

              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Table
              </p>
            </div>

            <select
              value={table}
              onChange={(e) =>
                setTable(
                  e.target.value
                )
              }
              className="w-full bg-transparent outline-none text-sm text-[#1E293B]"
            >
              {[
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
              ].map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  Table {item}
                </option>
              ))}
            </select>
          </div>

          {/* PEOPLE */}
          <div className="bg-[#F8FAFC] border border-blue-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users
                className="text-[#2563EB]"
                size={16}
              />

              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                People
              </p>
            </div>

            <select
              value={people}
              onChange={(e) =>
                setPeople(
                  e.target.value
                )
              }
              className="w-full bg-transparent outline-none text-sm text-[#1E293B]"
            >
              {[
                "1 Orang",
                "2 Orang",
                "3 Orang",
                "4 Orang",
                "5 Orang",
                "6 Orang",
              ].map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* SERVICE */}
          <div className="bg-[#F8FAFC] border border-blue-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <UtensilsCrossed
                className="text-[#2563EB]"
                size={16}
              />

              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                Service
              </p>
            </div>

            <select
              value={service}
              onChange={(e) =>
                setService(
                  e.target.value
                )
              }
              className="w-full bg-transparent outline-none text-sm text-[#1E293B]"
            >
              <option>
                Dine In
              </option>

              <option>
                Take Away
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}