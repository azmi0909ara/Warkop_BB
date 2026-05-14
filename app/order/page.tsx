"use client";

import { useState } from "react";

import {
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

import Navbar from "../components/navbar";

import TableSelector from "../components/order/table-selector";
import MenuCard from "../components/order/menu-card";
import OrderSummary from "../components/order/order-summary";

import { menus } from "../data/order-data";

export default function OrderPage() {
  const [table, setTable] =
    useState("01");

  const [
    customerName,
    setCustomerName,
  ] = useState("");

  const [people, setPeople] =
    useState("2 Orang");

  const [service, setService] =
    useState("Dine In");

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [cart, setCart] =
    useState<any[]>([]);

  // MOBILE DRAWER
  const [openCart, setOpenCart] =
    useState(false);

  // ADD CART
  const addToCart = (menu: any) => {
    const exist = cart.find(
      (item) => item.id === menu.id
    );

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === menu.id
            ? {
                ...item,
                qty: item.qty + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...menu,
          qty: 1,
        },
      ]);
    }
  };

  // INCREASE
  const increaseQty = (
    id: number
  ) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: item.qty + 1,
            }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (
    id: number
  ) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                qty: item.qty - 1,
              }
            : item
        )
        .filter(
          (item) => item.qty > 0
        )
    );
  };

  // REMOVE
  const removeItem = (
    id: number
  ) => {
    setCart(
      cart.filter(
        (item) => item.id !== id
      )
    );
  };

  // SUBTOTAL
  const subtotal = cart.reduce(
    (acc, item) =>
      acc +
      item.price * item.qty,
    0
  );

  // FILTER
  const filteredMenus =
    menus.filter((menu) => {
      const matchSearch =
        menu.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchCategory =
        selectedCategory ===
        "All"
          ? true
          : menu.category ===
            selectedCategory;

      return (
        matchSearch &&
        matchCategory
      );
    });

  return (
    <main className="bg-[#F8FAFC] min-h-screen text-[#1E293B]">
      <Navbar />

      <section className="pt-24 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-5">
          {/* TABLE */}
          <TableSelector
            customerName={
              customerName
            }
            setCustomerName={
              setCustomerName
            }
            table={table}
            setTable={setTable}
            people={people}
            setPeople={setPeople}
            service={service}
            setService={setService}
          />

          {/* MAIN */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
            {/* LEFT */}
            <div>
              {/* SEARCH */}
              <div className="bg-white rounded-2xl p-3 shadow-md border border-blue-100 mb-5 flex items-center gap-3">
                <Search className="text-[#2563EB] min-w-[20px]" />

                <input
                  type="text"
                  placeholder="Cari menu favorit..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  className="w-full outline-none bg-transparent text-[#1E293B] placeholder:text-slate-400 text-sm"
                />
              </div>

              {/* CATEGORY */}
              <div className="flex gap-3 mb-5 overflow-x-auto pb-1">
                {[
                  "All",
                  "Coffee",
                  "Non Coffee",
                  "Snack",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      setSelectedCategory(
                        item
                      )
                    }
                    className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition ${
                      selectedCategory ===
                      item
                        ? "bg-[#2563EB] text-white shadow-md"
                        : "bg-white border border-blue-100 text-slate-600"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* MENU GRID */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {/* EMPTY */}
                {filteredMenus.length ===
                  0 && (
                  <div className="col-span-full bg-white rounded-2xl p-10 text-center border border-blue-100 shadow-md text-slate-400">
                    Menu tidak ditemukan
                  </div>
                )}

                {/* MENU */}
                {filteredMenus.map(
                  (menu) => (
                    <MenuCard
                      key={menu.id}
                      menu={menu}
                      addToCart={
                        addToCart
                      }
                    />
                  )
                )}
              </div>
            </div>

            {/* DESKTOP CART */}
            <div className="hidden xl:block">
              <OrderSummary
                customerName={
                  customerName
                }
                cart={cart}
                subtotal={subtotal}
                service={service}
                table={table}
                people={people}
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
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE FLOATING CART */}
      <button
        onClick={() =>
          setOpenCart(true)
        }
        className="xl:hidden fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full bg-[#2563EB] text-white shadow-2xl flex items-center justify-center"
      >
        <div className="relative">
          <ShoppingBag size={24} />

          {cart.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center">
              {cart.length}
            </div>
          )}
        </div>
      </button>

      {/* MOBILE CART DRAWER */}
      <div
        className={`xl:hidden fixed inset-0 z-[60] transition duration-300 ${
          openCart
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        {/* OVERLAY */}
        <div
          onClick={() =>
            setOpenCart(false)
          }
          className="absolute inset-0 bg-black/40"
        />

        {/* DRAWER */}
        <div
          className={`absolute bottom-0 left-0 w-full bg-[#F8FAFC] rounded-t-[28px] p-4 max-h-[90vh] overflow-y-auto transition duration-300 ${
            openCart
              ? "translate-y-0"
              : "translate-y-full"
          }`}
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-[#1E293B]">
              Your Cart
            </h2>

            <button
              onClick={() =>
                setOpenCart(false)
              }
              className="w-10 h-10 rounded-full bg-white border border-blue-100 flex items-center justify-center"
            >
              <X size={18} />
            </button>
          </div>

          <OrderSummary
            customerName={
              customerName
            }
            cart={cart}
            subtotal={subtotal}
            service={service}
            table={table}
            people={people}
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
        </div>
      </div>
    </main>
  );
}