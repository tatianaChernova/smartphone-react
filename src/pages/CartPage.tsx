// src/pages/CartPage.tsx
import React from "react";

import { useCartDetails } from "../hooks/useCartDetails";

import { PageTransition } from "../components/PageTransition";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PageHeader } from "../components/PageHeader";
import { EmptyCart } from "../components/cart/EmptyCart";
import { CartToolbar } from "../components/cart/CartToolbar";
import { CartLineItem } from "../components/cart/CartLineItem";
import { CartSummary } from "../components/cart/CartSummary";

const CartPage: React.FC = () => {
    const { lines, total, oldTotal, selectedCount, allSelected, loading } = useCartDetails();

    if (loading) {
        return <div className="py-10 container">Загрузка корзины...</div>;
    }

    return (
        <PageTransition>
            <section>
                <div className="container">
                    <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Корзина" }]} />
                    <PageHeader title="Корзина" />

                    {lines.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
                            <div className="w-full flex-1">
                                <CartToolbar selectedCount={selectedCount} allSelected={allSelected} />

                                {lines.map((line) => (
                                    <CartLineItem
                                        key={`${line.product.id}-${line.colorValue ?? ""}`}
                                        line={line}
                                    />
                                ))}
                            </div>

                            <CartSummary total={total} oldTotal={oldTotal} />
                        </div>
                    )}
                </div>
            </section>
        </PageTransition>
    );
};

export default CartPage;