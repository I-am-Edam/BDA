"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface CartItem extends Product {
  quantity?: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);

        if (existingItem) {
          const quantity = (existingItem.quantity || 1) + 1;
          if (quantity <= (existingItem.stock || 0)) {
            set({
              items: currentItems.map((i) =>
                i.id === item.id ? { ...i, quantity } : i
              ),
              total: get().total + item.price,
            });
          }
        } else {
          set({
            items: [...currentItems, { ...item, quantity: 1 }],
            total: get().total + item.price,
          });
        }
      },
      removeItem: (id) => {
        const item = get().items.find((i) => i.id === id);
        if (item) {
          set({
            items: get().items.filter((i) => i.id !== id),
            total: get().total - item.price * (item.quantity || 1),
          });
        }
      },
      updateQuantity: (id, quantity) => {
        const currentItems = get().items;
        const item = currentItems.find((i) => i.id === id);
        
        if (item && quantity >= 1 && quantity <= (item.stock || 0)) {
          const oldQuantity = item.quantity || 1;
          set({
            items: currentItems.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
            total: get().total + item.price * (quantity - oldQuantity),
          });
        }
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: "cart-storage",
    }
  )
);