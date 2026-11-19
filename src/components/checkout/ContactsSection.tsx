// src/components/checkout/ContactsSection.tsx
import React from "react";
import type { Control } from "react-hook-form";

import type { CheckoutFormValues } from "../../schemas/checkoutSchema";
import { formatPhone } from "../../utils/formatPhone";
import { FormTextField } from "./FormTextField";

interface Props {
    control: Control<CheckoutFormValues>;
}

export const ContactsSection: React.FC<Props> = ({ control }) => (
    <section className="flex flex-col gap-2 md:gap-4">
        <h2 className="text-center text-xl">Контактные данные</h2>
        <div className="w-full flex flex-col md:flex-row gap-4">
            <FormTextField
                control={control}
                name="name"
                label="Имя *"
                autoComplete="given-name"
            />
            <FormTextField
                control={control}
                name="phone"
                label="Телефон *"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7-(___)-___-__-__"
                format={formatPhone}
            />
            <FormTextField
                control={control}
                name="email"
                label="Email"
                type="email"
                inputMode="email"
                autoComplete="email"
            />
        </div>
    </section>
);