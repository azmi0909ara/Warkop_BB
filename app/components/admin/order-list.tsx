"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import OrderCard from "./order-card";

interface Props {
  orders: any[];
  selectedOrder: any;
  setSelectedOrder: (
    order: any
  ) => void;
}

export default function OrderList({
  orders,
  selectedOrder,
  setSelectedOrder,
}: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={orders.length}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -10,
        }}
        transition={{
          duration: 0.25,
        }}
        className="space-y-5"
      >
        {orders.map((order) => (
          <OrderCard
            key={
              order.firestoreId
            }
            order={order}
            active={
              selectedOrder?.firestoreId ===
              order.firestoreId
            }
            onClick={() =>
              setSelectedOrder(
                order
              )
            }
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}