// src/components/checkout/CheckoutSummary.tsx
import React from "react";
import { formatPrice } from "../../utils/formatPrice";

interface Props {
    total: number;
    oldTotal: number;
    disabled: boolean;
}

export const CheckoutSummary: React.FC<Props> = ({ total, oldTotal, disabled }) => (
    <div className="-mx-4 border-t border-custom-accent px-4 pt-6 text-center lg:mx-0 lg:w-full lg:max-w-85 lg:sticky lg:top-4 lg:rounded-lg lg:border-0 lg:bg-[#E7E7ED] lg:p-10 lg:text-left">
        <div className="text-lg text-custom-dark-grey lg:text-2xl lg:text-black">Итого:</div>

        <div className="mt-1 mb-6 flex items-baseline justify-center gap-2 lg:justify-start">
            <span className="text-xl font-medium lg:text-2xl">{formatPrice(total)} ₽</span>
            {oldTotal > total && (
                <span className="text-sm text-custom-grey line-through font-light">
                    {formatPrice(oldTotal)} ₽
                </span>
            )}
        </div>

        <button
            type="submit"
            disabled={disabled}
            className="block w-full max-w-72 mx-auto lg:max-w-none py-3 rounded-lg text-center font-medium text-white transition-colors duration-300 bg-custom-primary enabled:hover:bg-custom-secondary disabled:bg-custom-primary/30 disabled:text-custom-dark-grey disabled:cursor-not-allowed"
        >
            Оплатить
        </button>
    </div>
);