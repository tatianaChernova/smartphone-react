// src/components/checkout/PaymentSection.tsx
import React from "react";
import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";

import type { CheckoutFormValues, PaymentMethod } from "../../schemas/checkoutSchema";
import { SAVED_CARD } from "../../api/paymentMethods";

import { InfoCircleIcon } from "../../ui/icons/InfoCircleIcon";
import { PlusSquareIcon } from "../../ui/icons/PlusSquareIcon";
import { SbpIcon } from "../../ui/icons/SbpIcon";

interface OptionProps {
    value: PaymentMethod;
    current: PaymentMethod;
    onSelect: (value: PaymentMethod) => void;
    ariaLabel: string;
    filledColor?: string;
    children: React.ReactNode;
}

const PaymentOption: React.FC<OptionProps> = ({
    value,
    current,
    onSelect,
    ariaLabel,
    filledColor,
    children,
}) => (
    <label className="cursor-pointer">
        <input
            type="radio"
            name="paymentMethod"
            value={value}
            checked={current === value}
            onChange={() => onSelect(value)}
            aria-label={ariaLabel}
            className="peer sr-only"
        />
        <span
            style={filledColor ? { backgroundColor: filledColor } : undefined}
            className={`flex h-13 items-stretch rounded-lg border transition-shadow peer-checked:ring-2 peer-checked:ring-custom-secondary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-custom-primary ${
                filledColor ? "border-transparent" : "border-custom-dark-grey"
            }`}
        >
            {children}
        </span>
    </label>
);

interface Props {
    control: Control<CheckoutFormValues>;
}

export const PaymentSection: React.FC<Props> = ({ control }) => {
    const { field } = useController({ control, name: "paymentMethod" });

    return (
        <section className="flex flex-col gap-4">
            <h2 className="text-center text-xl">Оплата</h2>

            <div className="flex w-fit items-center gap-3 rounded-lg border border-[#169B00] px-4 py-3">
                <span>Оплата только онлайн</span>
                <InfoCircleIcon className="h-6 w-6 text-[#169B00]" />
            </div>

            <div role="radiogroup" aria-label="Способ оплаты" className="flex flex-wrap gap-3">
                <PaymentOption
                    value="saved-card"
                    current={field.value}
                    onSelect={field.onChange}
                    ariaLabel={`Карта, оканчивается на ${SAVED_CARD.last4}`}
                    filledColor={SAVED_CARD.color}
                >
                    <span className="relative flex w-26 items-end justify-end p-1.5 text-xs text-black/80">
                        {SAVED_CARD.logo && (
                            <img src={SAVED_CARD.logo} alt="" className="absolute left-1.5 top-1.5 h-5" />
                        )}
                        **{SAVED_CARD.last4}
                    </span>
                </PaymentOption>

                <PaymentOption
                    value="sbp"
                    current={field.value}
                    onSelect={field.onChange}
                    ariaLabel="Система быстрых платежей"
                >
                    <span className="flex items-center px-4">
                       <SbpIcon />
                    </span>
                </PaymentOption>

                <PaymentOption
                    value="new-card"
                    current={field.value}
                    onSelect={field.onChange}
                    ariaLabel="Новая карта"
                >
                    <span className="flex items-center gap-3 px-4">
                        <span>Новая карта</span>
                        <PlusSquareIcon className="h-6 w-6" />
                    </span>
                </PaymentOption>
            </div>
        </section>
    );
};