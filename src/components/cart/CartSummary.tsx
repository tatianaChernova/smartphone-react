// src/components/cart/CartSummary.tsx
import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

interface Props {
    total: number;
    oldTotal: number;
}

export const CartSummary: React.FC<Props> = ({ total, oldTotal }) => (
    <div className="w-full lg:max-w-85 py-2 lg:p-10 text-center lg:text-left lg:bg-[#E7E7ED] lg:rounded-lg lg:sticky lg:top-4">
        <div className="text-lg lg:text-2xl text-custom-dark-grey lg:text-black">Итого:</div>
        <div className="mt-1 mb-6 flex items-baseline justify-center lg:justify-start gap-2">
            <span className="text-xl lg:text-2xl font-medium">{formatPrice(total)} ₽</span>
            {oldTotal > total && (
                <span className="text-sm text-custom-grey line-through font-light">
                    {formatPrice(oldTotal)} ₽
                </span>
            )}
        </div>
        <Link
            to="/checkout"
            className="block w-full max-w-72 mx-auto lg:max-w-none py-3 rounded-lg text-center font-medium text-white transition-colors duration-300 bg-custom-primary hover:bg-custom-secondary"
        >
            Оформить заказ
        </Link>
    </div>
);