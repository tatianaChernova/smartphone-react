// src/hooks/useSelectedPickupPoint.ts
import { usePickupPoints } from "./usePickupPoints";
import { useCheckoutStore } from "../store/checkoutStore";

export function useSelectedPickupPoint() {
    const { points, loading } = usePickupPoints();
    const pickupPointId = useCheckoutStore((s) => s.pickupPointId);
    const selected = points.find((p) => p.id === pickupPointId) ?? null;

    return { points, loading, selected };
}