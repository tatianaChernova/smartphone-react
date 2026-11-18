// src/components/product/ProductDetails.tsx
import React, { useState } from "react";

import type { ProductColor, ProductItem } from "../../types/product";

import { PageTransition } from "../PageTransition";
import { Breadcrumbs } from "../Breadcrumbs";
import { PageHeader } from "../PageHeader";
import { ProductGallery } from "./ProductGallery";
import { ColorPicker } from "./ColorPicker";
import { ProductSpecs } from "./ProductSpecs";
import { PurchasePanel } from "./PurchasePanel";

interface Props {
    product: ProductItem;
}

export const ProductDetails: React.FC<Props> = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
        product.colors?.[0] ?? null
    );

    return (
        <PageTransition>
            <section>
                <div className="container">
                    <Breadcrumbs
                        items={[
                            { label: "Главная", to: "/" },
                            { label: "Каталог", to: "/catalog" },
                            { label: product.name },
                        ]}
                    />

                    <PageHeader title="Карточка товара" as="span" />

                    <div className="pb-28 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[26rem_minmax(0,1fr)_21rem] items-start gap-6 md:gap-10">
                        <ProductGallery product={product} />

                        <div className="min-w-0 w-full flex flex-col gap-5">
                            <h1 className="text-xl md:text-3xl">{product.name}</h1>

                            {!!product.colors?.length && (
                                <ColorPicker
                                    colors={product.colors}
                                    selected={selectedColor}
                                    onSelect={setSelectedColor}
                                />
                            )}

                            <ProductSpecs attributes={product.attributes} />
                        </div>

                        <PurchasePanel product={product} colorValue={selectedColor?.value} />
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};