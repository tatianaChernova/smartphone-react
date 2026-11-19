// src/data/paymentMethods.ts
export interface SavedCard {
    last4: string;
    color: string;
    logo?: string;   // например "/images/payment/tbank.svg" (выгрузите из макета)
}

export const SAVED_CARD: SavedCard = {
    last4: "1122",
    color: "#EDB91C",
};