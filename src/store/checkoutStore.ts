// src/store/checkoutStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CheckoutState {
    pickupPointId: number | null;
    setPickupPoint: (id: number) => void;
}

export const useCheckoutStore = create<CheckoutState>()(
    persist(
        (set) => ({
            pickupPointId: null,
            setPickupPoint: (id) => set({ pickupPointId: id }),
        }),
        { name: "checkout-storage" }
    )
);