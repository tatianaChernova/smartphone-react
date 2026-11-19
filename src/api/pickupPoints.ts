// src/api/pickupPoints.ts
import data from "../data/pickup-points.json";
import type { PickupPoint } from "../types/pickupPoint";

export const getPickupPoints = async (): Promise<PickupPoint[]> => data as PickupPoint[];