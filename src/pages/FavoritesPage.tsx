// src/pages/FavoritesPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { ProductItem } from "../types/product";

import { getProducts } from "../api/products";
import { useFavoritesStore } from "../store/favoritesStore";

import { PageTransition } from "../components/PageTransition";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PageHeader } from "../components/PageHeader";
import { ProductCard } from "../components/product/ProductCard";

const FavoritesPage: React.FC = () => {
    const ids = useFavoritesStore((s) => s.ids);

    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div className="py-10 container">Загрузка товаров...</div>;
    }

    const favoriteProducts = products.filter((p) => ids.includes(p.id));

    return (
        <PageTransition>
            <section>
                <div className="container">
                    <Breadcrumbs items={[{ label: "Главная", to: "/" }, { label: "Избранное" }]} />
                    <PageHeader title="Избранное" />

                    {favoriteProducts.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            В избранном пока ничего нет.{" "}
                            <Link to="/catalog" className="text-custom-primary hover:text-custom-secondary transition-colors">
                                Перейти в каталог
                            </Link>
                        </div>
                    ) : (
                        <div className="relative grid grid-cols-2 items-start lg:grid-cols-4 gap-y-4 lg:gap-y-0 gap-x-4">
                            {favoriteProducts.map((product) => (
                                <ProductCard key={product.id} product={product} view="grid" />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PageTransition>
    );
};

export default FavoritesPage;