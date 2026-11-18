// src/hooks/useProduct.ts
import { useEffect, useState } from "react";
import type { ProductItem } from "../types/product";
import { getProducts } from "../api/products";

export function useProduct(id: string | undefined) {
    const [product, setProduct] = useState<ProductItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;   // если id сменился до ответа, старый результат игнорируем

        getProducts().then((data) => {
            if (cancelled) return;
            setProduct(data.find((p) => Number(p.id) === Number(id)) ?? null);
            setLoading(false);
        });

        return () => {
            cancelled = true;
        };
    }, [id]);

    return { product, loading };
}