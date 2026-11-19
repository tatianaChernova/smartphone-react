// src/api/pickupPoints.ts

import type { PickupPoint } from "../types/pickupPoint";
// import data from "../data/pickup-points.json";
// export const getPickupPoints = async (): Promise<PickupPoint[]> => data as PickupPoint[];

const API_URL = "https://api.jsonbin.io/v3/b/6a213164da38895dfe852c83";

const API_KEY = "$2a$10$UsYad.S7LsdDjDErHh.jaOEOxE2RSH0IzilPcdjliKoBbLdEyhy42";

export const getPickupPoints = async (): Promise<PickupPoint[]> => {
    const res = await fetch(`${API_URL}/latest`, {
        headers: {
            "X-Master-Key": API_KEY,
        },
    });

    if (!res.ok) {
        throw new Error("Ошибка при загрузке пунктов выдачи");
    }

    const data = await res.json();

    return data.record.pickupPoints;
};