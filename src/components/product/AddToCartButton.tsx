// src/components/AddToCartButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import type { ProductItem } from "./../../types/product";
import { useCartStore } from "./../../store/cartStore";

interface Props {
    product: ProductItem;
    colorValue?: string;   // передаём на странице товара (выбранный цвет)
    className?: string;
}

export const AddToCartButton: React.FC<Props> = ({ product, colorValue, className = "" }) => {
    const navigate = useNavigate();
    const add = useCartStore((s) => s.add);

    // Без colorValue (карточка) проверяем, есть ли товар в корзине в любом цвете.
    // С colorValue (страница товара) — именно выбранный цвет.
    const inCart = useCartStore((s) =>
        s.items.some(
            (i) =>
                i.productId === product.id &&
                (colorValue === undefined || i.colorValue === colorValue)
        )
    );

    const handleClick = () => {
        if (inCart) {
            navigate("/cart");
            return;
        }
        // на карточке цвет не выбирается, берём первый по умолчанию
        add(product.id, colorValue ?? product.colors?.[0]?.value);
    };

    const stateClasses = !product.inStock
        ? "bg-custom-accent text-custom-dark-grey cursor-not-allowed"
        : inCart
            ? "bg-custom-secondary text-white"
            : "bg-custom-primary hover:bg-custom-secondary text-white";

    return (
        <button
            type="button"
            disabled={!product.inStock}
            onClick={handleClick}
            className={`py-2.5 rounded-lg font-medium transition-colors duration-300 ${stateClasses} ${className}`}
        >
            {!product.inStock ? "Под заказ" : inCart ? "В корзине" : "В корзину"}
        </button>
    );
};