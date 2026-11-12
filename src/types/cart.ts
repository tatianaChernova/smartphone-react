// src/types/cart.ts
export interface CartItem {
    productId: number;
    colorValue?: string;   // value цвета, например "#FF0000"
    quantity: number;
}