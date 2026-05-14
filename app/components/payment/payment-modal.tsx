"use client";

import QRCode from "react-qr-code";

import {
  X,
  CheckCircle2,
} from "lucide-react";

interface Props {
  open: boolean;

  onClose: () => void;

  total: number;

  orderId: string;

  onSuccess: () => void;
}

export default function PaymentModal({
  open,
  onClose,
  total,
  orderId,
  onSuccess,
}: Props) {
  if (!open) return null;

  const qrValue = `
    WARKOP-BIRU-BUNGA
    ORDER:${orderId}
    TOTAL:${total}
  `;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-[30px] p-6 shadow-2xl relative animate-in fade-in zoom-in">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"
        >
          <X size={18} />
        </button>

        {/* HEADER */}
        <div className="text-center mb-6">
          <p className="text-[#2563EB] font-semibold tracking-widest text-sm uppercase mb-2">
            QR Payment
          </p>

          <h2 className="text-3xl font-black">
            Scan QR
          </h2>

          <p className="text-slate-500 text-sm mt-2">
            Gunakan e-wallet atau mobile banking
          </p>
        </div>

        {/* QR */}
        <div className="bg-white p-4 rounded-[24px] border border-slate-200 shadow-md mb-6">
          <QRCode
            value={qrValue}
            size={240}
            className="mx-auto"
          />
        </div>

        {/* INFO */}
        <div className="bg-[#F8FAFC] rounded-2xl p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-slate-500">
              Order ID
            </span>

            <span className="font-semibold">
              {orderId}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">
              Total
            </span>

            <span className="text-2xl font-black text-[#2563EB]">
              Rp{" "}
              {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={onSuccess}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:opacity-90 text-white py-4 rounded-2xl font-bold shadow-lg transition flex items-center justify-center gap-3"
        >
          <CheckCircle2 size={22} />

          Saya Sudah Bayar
        </button>
      </div>
    </div>
  );
}