// src/components/product/PurchasePanel.tsx
import React from "react";
import type { ProductItem } from "../../types/product";
import { formatPrice } from "../../utils/formatPrice";
import { AddToCartButton } from "./AddToCartButton";

interface Props {
    product: ProductItem;
    colorValue?: string;
}

export const PurchasePanel: React.FC<Props> = ({ product, colorValue }) => (
    <div className="fixed bottom-24 h-26 left-0 z-20 flex items-center justify-between gap-4 p-4 w-full bg-custom-bg border-t border-custom-light md:border-0 md:static md:h-[unset] xl:block md:p-10 md:col-span-2 xl:col-span-1 md:bg-[#E7E7ED] md:rounded-lg md:shadow-none">
        <div className="text-xl md:text-2xl mb-0 xl:mb-7 whitespace-nowrap">
            {formatPrice(product.price)} ₽
        </div>

        <AddToCartButton
            product={product}
            colorValue={colorValue}
            className="flex-1 max-w-100 md:w-full"
        />
    </div>
);