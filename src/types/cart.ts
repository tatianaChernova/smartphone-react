// src/types/cart.ts
export interface CartItem {
    productId: number;
    colorValue?: string;
    quantity: number;
    selected?: boolean;   // undefined = выбран (для корзин, сохранённых раньше)
}