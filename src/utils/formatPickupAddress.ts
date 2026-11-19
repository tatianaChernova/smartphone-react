// src/utils/formatPickupAddress.ts
import type { PickupPoint } from "../types/pickupPoint";

export const formatPickupAddress = (point: PickupPoint) =>
    `г. ${point.city}, ${point.address}`;