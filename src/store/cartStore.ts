// src/store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "../types/cart";

interface CartState {
    items: CartItem[];
    add: (productId: number, colorValue?: string) => void;
    remove: (productId: number, colorValue?: string) => void;
    setQuantity: (productId: number, colorValue: string | undefined, quantity: number) => void;
    clear: () => void;
}

const isSameLine = (item: CartItem, productId: number, colorValue?: string) =>
    item.productId === productId && item.colorValue === colorValue;

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],

            add: (productId, colorValue) =>
                set((s) => {
                    const exists = s.items.some((i) => isSameLine(i, productId, colorValue));
                    return {
                        items: exists
                            ? s.items.map((i) =>
                                isSameLine(i, productId, colorValue)
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            )
                            : [...s.items, { productId, colorValue, quantity: 1 }],
                    };
                }),

            remove: (productId, colorValue) =>
                set((s) => ({
                    items: s.items.filter((i) => !isSameLine(i, productId, colorValue)),
                })),

            setQuantity: (productId, colorValue, quantity) =>
                set((s) => ({
                    items:
                        quantity <= 0
                            ? s.items.filter((i) => !isSameLine(i, productId, colorValue))
                            : s.items.map((i) =>
                                isSameLine(i, productId, colorValue) ? { ...i, quantity } : i
                            ),
                })),

            clear: () => set({ items: [] }),
        }),
        { name: "cart-storage" }
    )
);