// src/components/cart/CartLineItem.tsx
import React from "react";
import { Link } from "react-router-dom";

import type { CartLine } from "../../hooks/useCartDetails";
import { useCartStore } from "../../store/cartStore";
import { formatPrice } from "../../utils/formatPrice";

import { Checkbox } from "../Checkbox";
import { FavoriteButton } from "../FavoriteButton";
import { QuantityStepper } from "../QuantityStepper";
import { DeleteIcon } from "../../ui/icons/DeleteIcon";

interface Props {
    line: CartLine;
}

export const CartLineItem: React.FC<Props> = ({ line }) => {
    const { product, color, colorValue, quantity, selected } = line;

    const setQuantity = useCartStore((s) => s.setQuantity);
    const remove = useCartStore((s) => s.remove);
    const toggleSelected = useCartStore((s) => s.toggleSelected);

    return (
        <div className="py-4 md:py-6 flex gap-4 md:gap-6 border-b border-custom-accent">
            <Link to={`/product/${product.id}`} className="w-24 md:w-36 shrink-0">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-24 md:h-36 object-contain rounded-lg"
                />
            </Link>

            <div className="flex-1 min-w-0 flex flex-col gap-2">
                {/* Название + чекбокс */}
                <div className="flex items-start justify-between gap-3">
                    <Link
                        to={`/product/${product.id}`}
                        className="text-sm md:text-xl leading-5 md:leading-8"
                    >
                        {product.name}
                    </Link>
                    <Checkbox
                        checked={selected}
                        onChange={() => toggleSelected(product.id, colorValue)}
                        ariaLabel="Выбрать товар"
                        className="shrink-0"
                    />
                </div>

                {color && (
                    <div className="flex items-center gap-2 text-sm text-custom-dark-grey">
                        <span
                            className={`w-4 h-4 rounded ${color.value === "#FFFFFF" ? "border border-gray-500" : ""}`}
                            style={{ backgroundColor: color.value }}
                        />
                        {color.name}
                    </div>
                )}

                {/* Сумма по позиции */}
                <div className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-xl md:text-2xl font-medium whitespace-nowrap">
                        {formatPrice(product.price * quantity)} ₽
                    </span>
                    {product.oldPrice && (
                        <span className="text-sm text-custom-grey line-through font-light whitespace-nowrap">
                            {formatPrice(product.oldPrice * quantity)} ₽
                        </span>
                    )}
                </div>

                {/* Избранное · удалить · количество */}
                <div className="mt-auto flex items-center justify-between gap-4">
                    <FavoriteButton productId={product.id} size="sm" />

                    <button
                        type="button"
                        aria-label="Удалить из корзины"
                        onClick={() => remove(product.id, colorValue)}
                        className="ml-auto text-custom-dark-grey hover:text-custom-secondary transition-colors"
                    >
                        <DeleteIcon className="w-5 h-6" />
                    </button>

                    <QuantityStepper
                        value={quantity}
                        onChange={(value) => setQuantity(product.id, colorValue, value)}
                    />
                </div>
            </div>
        </div>
    );
};