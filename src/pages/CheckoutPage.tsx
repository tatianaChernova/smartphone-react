// src/pages/CheckoutPage.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { checkoutSchema } from "../schemas/checkoutSchema";
import type { CheckoutFormValues } from "../schemas/checkoutSchema";

import { useCartDetails } from "../hooks/useCartDetails";
import { useSelectedPickupPoint } from "../hooks/useSelectedPickupPoint";

import { PageTransition } from "../components/PageTransition";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PageHeader } from "../components/PageHeader";
import { PickupSection } from "../components/checkout/PickupSection";
import { ContactsSection } from "../components/checkout/ContactsSection";
import { PaymentSection } from "../components/checkout/PaymentSection";
import { CheckoutSummary } from "../components/checkout/CheckoutSummary";

const CheckoutPage: React.FC = () => {
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        mode: "onChange",
        defaultValues: { name: "", phone: "", email: "", paymentMethod: "saved-card" },
    });

    const { lines, total, oldTotal } = useCartDetails();
    const { selected: pickupPoint } = useSelectedPickupPoint();

    const canPay = isValid && !!pickupPoint && lines.length > 0;

    // пока заглушка: на следующем шаге здесь будет создание заказа
    const onSubmit = (values: CheckoutFormValues) => {
        console.log({ ...values, pickupPointId: pickupPoint?.id, total });
    };

    return (
        <PageTransition>
            <section>
                <div className="container">
                    <Breadcrumbs
                        items={[
                            { label: "Главная", to: "/" },
                            { label: "Корзина", to: "/cart" },
                            { label: "Оформление заказа" },
                        ]}
                    />
                    <PageHeader title="Оформление заказа" />

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10"
                    >
                        <div className="flex w-full flex-1 flex-col gap-6 md:gap-8">
                            <PickupSection />
                            <ContactsSection control={control} />
                            <PaymentSection control={control} />
                        </div>

                        <CheckoutSummary total={total} oldTotal={oldTotal} disabled={!canPay} />
                    </form>
                </div>
            </section>
        </PageTransition>
    );
};

export default CheckoutPage;