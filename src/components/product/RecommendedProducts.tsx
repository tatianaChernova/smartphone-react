// src/components/product/RecommendedProducts.tsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import type { ProductItem } from "../../types/product";
import { getProducts } from "../../api/products";
import { ProductCard } from "./ProductCard";

interface Props {
    title?: string;
    limit?: number;
    className?: string;
}

export const RecommendedProducts: React.FC<Props> = ({
    title = "Вам может понравиться",
    limit = 8,
    className = "",
}) => {
    const [products, setProducts] = useState<ProductItem[]>([]);

    useEffect(() => {
        getProducts().then((data) =>
            setProducts(data.filter((p) => p.inStock).slice(0, limit))
        );
    }, [limit]);

    if (!products.length) return null;

    return (
    <section className={`flex flex-col gap-9 ${className}`}>
            <h4 className="text-center text-lg">{title}</h4>

            <div className="py-4 lg:py-0 border-b border-t lg:border-t-0 border-custom-accent">
                <Swiper
                    spaceBetween={16}
                    slidesPerView={2.2}          // 2 карточки + кусочек третьей, как на скрине
                    slidesOffsetBefore={16}      // отступ первой карточки = padding контейнера
                    slidesOffsetAfter={16}
                    breakpoints={{
                        768: { slidesPerView: 3, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
                        1024: { slidesPerView: 4, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard product={product} view="grid" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};