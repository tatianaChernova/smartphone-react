// src/pages/FavoritesPage.tsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import type { ProductItem } from "../types/product";

import { getProducts } from "../api/products";
import { useFavoritesStore } from "../store/favoritesStore";

import { ProductCard } from "../components/product/ProductCard";
import { BackIcon } from "../ui/icons/BackIcon";

const FavoritesPage: React.FC = () => {
    const navigate = useNavigate();
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
        <motion.div
            className="pb-30"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                mass: 0.8
            }}
        >
            <section>
                <div className="container">
                    {/* Хлебные крошки */}
                    <div className="text-sm text-gray-500 mb-6">
                        <Link to="/" className="hover:text-gray-700">
                            Главная
                        </Link>
                        {" / "}
                        <span className="text-black">Избранное</span>
                    </div>

                    <div className="mb-8 flex items-center gap-5">
                        <button type="button" onClick={() => navigate(-1)}>
                            <BackIcon className="w-4 h-4 md:w-5 md:h-7" />
                        </button>
                        <h1 className="text-xl md:text-[32px]">Избранное</h1>
                    </div>

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
        </motion.div>
    );
};

export default FavoritesPage;