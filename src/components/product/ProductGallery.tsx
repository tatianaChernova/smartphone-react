// src/components/product/ProductGallery.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import type { ProductItem } from "../../types/product";
import { getDiscountPercent } from "../../utils/getDiscountPercent";
import { FavoriteButton } from "../FavoriteButton";

interface Props {
    product: ProductItem;
}

export const ProductGallery: React.FC<Props> = ({ product }) => {
    const discount = getDiscountPercent(product.price, product.oldPrice);

    return (
        <div className="relative min-w-0">
            {discount && (
                <div className="absolute top-1 left-1 bg-custom-tertiary text-lg px-2 py-1 z-4 rounded-lg">
                    -{discount}%
                </div>
            )}

            <FavoriteButton productId={product.id} className="absolute top-1 right-1 z-10" />

            <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                className="h-full product-image-swiper"
            >
                {product.images.map((img, i) => (
                    <SwiperSlide key={i}>
                        <div className="h-64 sm:h-80 md:h-96 xl:h-147 flex items-center justify-center">
                            <img
                                src={img}
                                alt={product.name}
                                className="object-contain h-full rounded-lg"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};