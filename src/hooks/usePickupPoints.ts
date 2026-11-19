// src/hooks/usePickupPoints.ts
import { useEffect, useState } from "react";
import type { PickupPoint } from "../types/pickupPoint";
import { getPickupPoints } from "../api/pickupPoints";

export function usePickupPoints() {
    const [points, setPoints] = useState<PickupPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPickupPoints()
            .then(setPoints)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { points, loading };
}