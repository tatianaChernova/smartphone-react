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
    toggleSelected: (productId: number, colorValue?: string) => void;
    setAllSelected: (selected: boolean) => void;
    removeSelected: () => void;
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
                            : [...s.items, { productId, colorValue, quantity: 1, selected: false }],
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

            toggleSelected: (productId, colorValue) =>
                set((s) => ({
                    items: s.items.map((i) =>
                        isSameLine(i, productId, colorValue)
                            ? { ...i, selected: !i.selected }
                            : i
                    ),
                })),

            setAllSelected: (selected) =>
                set((s) => ({ items: s.items.map((i) => ({ ...i, selected })) })),

            removeSelected: () =>
                set((s) => ({ items: s.items.filter((i) => !i.selected) })),
        }),
        { name: "cart-storage" }
    )
);