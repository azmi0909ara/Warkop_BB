"use client";

import {
  ShoppingBag,
} from "lucide-react";

import CartItem from "./cart-item";

import {
  addDoc,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

interface Props {
  customerName: string;

  cart: any[];
  subtotal: number;

  service: string;

  table: string;
  people: string;

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

export default function OrderSummary({
  customerName,
  cart,
  subtotal,
  service,
  table,
  people,
  increaseQty,
  decreaseQty,
  removeItem,
}: Props) {
  // CHECKOUT
  const handleCheckout =
    async () => {
      if (!customerName) {
        alert(
          "Masukkan nama pemesan"
        );
        return;
      }

      if (cart.length === 0) {
        alert("Cart kosong");
        return;
      }

      try {
        // GET TOTAL ORDER
        const snapshot =
          await getDocs(
            collection(
              db,
              "orders"
            )
          );

        const totalOrders =
          snapshot.size + 1;

        // GENERATE ID
        const orderId = `WBB-${String(
          totalOrders
        ).padStart(3, "0")}`;

        // SAVE FIREBASE
        await addDoc(
          collection(db, "orders"),
          {
            orderId,

            customerName,

            table,
            people,
            service,

            items: cart.map(
              (item) => ({
                id: item.id,
                name: item.name,
                qty: item.qty,
                price:
                  item.price,
                image:
                  item.image,
              })
            ),

            total: subtotal,

            status: "Pending",

            createdAt:
              new Date(),
          }
        );

        alert(
          "Order berhasil dikirim 🚀"
        );

        window.location.reload();
      } catch (error) {
        console.error(error);

        alert(
          "Gagal mengirim order"
        );
      }
    };

  return (
    <div className="bg-white rounded-[24px] p-4 shadow-lg border border-blue-100 xl:sticky xl:top-28">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-2xl bg-[#EFF6FF] flex items-center justify-center">
          <ShoppingBag className="text-[#2563EB]" size={20} />
        </div>

        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wide">
            Your Order
          </p>

          <h2 className="text-xl font-black text-[#1E293B]">
            Cart Summary
          </h2>
        </div>
      </div>

      {/* CART ITEMS */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {cart.length === 0 && (
          <div className="bg-[#F8FAFC] border border-dashed border-blue-100 rounded-2xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#DBEAFE] flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="text-[#2563EB]" />
            </div>

            <h3 className="font-bold text-sm text-[#1E293B] mb-2">
              Cart Masih Kosong
            </h3>

            <p className="text-xs text-slate-400">
              Tambahkan menu favoritmu
              terlebih dahulu
            </p>
          </div>
        )}

        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            increaseQty={
              increaseQty
            }
            decreaseQty={
              decreaseQty
            }
            removeItem={
              removeItem
            }
          />
        ))}
      </div>

      {/* TOTAL */}
      <div className="border-t border-dashed border-slate-200 mt-5 pt-5">
        {/* INFO */}
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between text-sm">
            <p className="text-slate-500">
              Customer
            </p>

            <p className="font-semibold text-[#1E293B]">
              {customerName ||
                "-"}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <p className="text-slate-500">
              Table
            </p>

            <p className="font-semibold text-[#1E293B]">
              {table}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm">
            <p className="text-slate-500">
              Service
            </p>

            <p className="font-semibold text-[#1E293B]">
              {service}
            </p>
          </div>
        </div>

        {/* TOTAL BOX */}
        <div className="bg-gradient-to-r from-[#2563EB] to-blue-500 rounded-2xl p-4 text-white mb-4">
          <p className="text-blue-100 text-xs uppercase tracking-wide mb-2">
            Total Payment
          </p>

          <h2 className="text-2xl font-black">
            Rp{" "}
            {subtotal.toLocaleString()}
          </h2>
        </div>

        {/* CHECKOUT */}
        <button
          onClick={handleCheckout}
          className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl"
        >
          Checkout Order
        </button>
      </div>
    </div>
  );
}