// src/hooks/useCartDetails.ts
import { useEffect, useMemo, useState } from "react";
import type { ProductColor, ProductItem } from "../types/product";
import { getProducts } from "../api/products";
import { useCartStore } from "../store/cartStore";

export interface CartLine {
    product: ProductItem;
    colorValue?: string;
    color?: ProductColor;
    quantity: number;
}

export function useCartDetails() {
    const items = useCartStore((s) => s.items);
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    const lines: CartLine[] = useMemo(
        () =>
            items.flatMap((item) => {
                const product = products.find((p) => p.id === item.productId);
                // если товар удалили из JSON, позицию просто не показываем
                if (!product) return [];
                const color = product.colors?.find((c) => c.value === item.colorValue);
                return [{ product, colorValue: item.colorValue, color, quantity: item.quantity }];
            }),
        [items, products]
    );

    const total = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
    const count = lines.reduce((sum, l) => sum + l.quantity, 0);

    return { lines, total, count, loading };
}