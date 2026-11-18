// src/components/catalog/ProductGrid.tsx
import React from "react";

import type { ProductItem } from "../../types/product";
import type { ViewMode } from "./CatalogToolbar";
import { ProductCard } from "../product/ProductCard";

interface Props {
    products: ProductItem[];
    view: ViewMode;
}

export const ProductGrid: React.FC<Props> = ({ products, view }) => (
    <div
        className={
            view === "grid"
                ? "relative grid grid-cols-2 items-start lg:grid-cols-4 gap-y-4 lg:gap-y-0 gap-x-4"
                : "w-full flex flex-col"
        }
    >
        {products.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-500">Нет товаров</div>
        ) : (
            products.map((product) => (
                <ProductCard key={product.id} product={product} view={view} />
            ))
        )}
    </div>
);