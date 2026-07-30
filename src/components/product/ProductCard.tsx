import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { HeartIcon } from "../../ui/icons/HeartIcon";
import type { ProductItem } from "../../types/product";

import { formatPrice } from "../../utils/formatPrice";
import { getDiscountPercent } from "../../utils/getDiscountPercent";

interface ProductCardProps {
    product: ProductItem;
    view?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, view = 'grid' }) => {
    const discount = getDiscountPercent(product.price, product.oldPrice);
    if (view === 'list') {
        return (
            <div className="px-0 py-6 md:p-6 w-full flex justify-between items-start flex-wrap md:flex-nowrap gap-5 md:gap-6 group cursor-pointer border-t border-custom-accent">
                {/* Слайдер изображений */}

                <div className="relative w-25 md:w-42">
                    {discount && (
                        <div className="absolute top-0 right-0 bg-custom-tertiary text-lg px-2 py-1 z-4 rounded-lg">
                            -{discount}%
                        </div>
                    )}
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        className="product-image-swiper"
                    >
                        {product.images.map((img, i) => (

                            <SwiperSlide key={i}>
                                <Link to={`/product/${product.id}`}>
                                    <div className="w-full h-35 md:h-54 flex items-center justify-center">
                                        <img
                                            src={img}
                                            alt={product.name}
                                            className="object-contain h-full rounded-lg"
                                        />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Инфо */}
                <div className="flex-1">
                    {/* Наименование товара */}
                    <Link to={`/product/${product.id}`}>
                        <div className="mb-3 text-xl leading-8">
                            {product.name}
                        </div>
                    </Link>
                    {/* Характеристики (только в списке) */}
                    <div className="mb-0 md:mb-5 flex flex-col text-sm text-custom-dark-grey">
                        {product.attributes?.screenSize && (
                            <div>Экран: {product.attributes.screenSize}"</div>
                        )}
                        {product.attributes?.cores && (
                            <div>Количество ядер: {product.attributes.cores}</div>
                        )}
                        {product.attributes?.ram && (
                            <div>Оперативная память: {product.attributes.ram} ГБ</div>
                        )}
                        {product.attributes?.storage && (
                            <div>Встроенная память: {product.attributes.storage} ГБ</div>
                        )}
                    </div>
                    {/* Наличие */}
                    <div className={`hidden whitespace-nowrap md:block text-sm mt-1 ${product.inStock ? 'text-[#169B00]' : 'text-custom-dark-grey'}`}>
                        {product.inStock ? 'В наличии' : 'Нет в наличии'}
                    </div>
                </div>
                <div className="w-full md:w-fit">
                    {/* Цены*/}
                    <div className="mb-5 md:mb-6 ml-auto md:ml-0 w-[calc(100%-120px)] md:w-fit flex items-center justify-between md:justify-end gap-2">
                        <div className={`whitespace-nowrap md:hidden text-sm mt-1 ${product.inStock ? 'text-[#169B00]' : 'text-custom-dark-grey'}`}>
                            {product.inStock ? 'В наличии' : 'Нет в наличии'}
                        </div>
                        <span className="text-xl font-medium whitespace-nowrap">
                            {formatPrice(product.price)} ₽
                        </span>

                        {product.oldPrice && (
                            <span className="text-sm text-custom-grey line-through font-light whitespace-nowrap">
                                {formatPrice(product.oldPrice)} ₽
                            </span>
                        )}
                    </div>

                    <div className="ml-auto md:ml-0 w-[calc(100%-120px)] md:w-66 flex items-center justify-end gap-4">
                        {/* Избранное */}
                        <button type="button" className="w-11 h-11 flex items-center justify-center bg-custom-bg shadow-[1px_1px_20px_0_rgba(0,0,0,0.10)] rounded-lg">
                            <HeartIcon />
                        </button>
                        {/* Кнопка "Корзина" */}
                        <button type="button" disabled={!product.inStock}
                            className={`flex-1 py-2.5 rounded-lg text-white font-medium transition-colors duration-300 
                                    ${product.inStock
                                    ? 'bg-custom-primary hover:bg-custom-secondary'
                                    : 'bg-custom-accent text-custom-dark-grey cursor-not-allowed'}`}>
                            {product.inStock ? 'В корзину' : 'Под заказ'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="px-0 md:p-6 flex flex-col group cursor-pointer h-full relative
                  lg:before:content-['']
                  lg:before:absolute
                  lg:before:-left-2
                  lg:before:-right-2
                  lg:before:top-0
                  lg:before:w-[calc(100 % + 4)]
                  lg:before:h-px
                  lg:before:bg-custom-accent">
                {/* Слайдер изображений */}
                <div className="relative shrink-0 w-full">
                    {discount && (
                        <div className="absolute top-0 right-0 bg-custom-tertiary text-lg px-2 py-1 z-4 rounded-lg">
                            -{discount}%
                        </div>
                    )}
                    <Swiper
                        modules={[Pagination]}
                        pagination={{ clickable: true }}
                        className="w-full h-full product-image-swiper"
                    >
                        {product.images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <Link to={`/product/${product.id}`}>
                                    <div className="w-full h-30 md:h-54 flex items-center justify-center ">
                                        <img
                                            src={img}
                                            alt={product.name}
                                            className="object-contain h-full rounded-lg"
                                        />
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Инфо */}
                <Link to={`/product/${product.id}`}>
                    <div className="mt-2 text-base md:text-xl leading-6 md:leading-8 line-clamp-2 min-h-12">
                        {product.name}
                    </div>
                </Link>
                <div className="mt-auto">
                    {/* Цены*/}

                    <div className="mt-3 flex items-center gap-2">
                        <span className="text-lg md:text-xl font-medium">
                            {formatPrice(product.price)} ₽
                        </span>

                        {product.oldPrice && (
                            <span className="text-sm text-custom-grey line-through font-light">
                                {formatPrice(product.oldPrice)} ₽
                            </span>
                        )}
                    </div>

                    {/* Наличие и избранное */}
                    <div className="mt-2.5 flex items-center justify-between gap-1">
                        <div className={`text-sm mt-1 ${product.inStock ? 'text-[#169B00]' : 'text-custom-dark-grey'}`}>
                            {product.inStock ? 'В наличии' : 'Нет в наличии'}
                        </div>

                        <button type="button" className="w-10 h-10 flex items-center justify-center bg-custom-bg shadow-[1px_1px_20px_0_rgba(0,0,0,0.10)] rounded-lg">
                            <HeartIcon />
                        </button>
                    </div>

                    {/* Кнопка "Корзина" */}
                    <button type="button" disabled={!product.inStock}
                        className={`mt-6 w-full py-2.5 rounded-lg text-white font-medium transition-colors duration-300 
                    ${product.inStock
                                ? 'bg-custom-primary hover:bg-custom-secondary'
                                : 'bg-custom-accent text-custom-dark-grey cursor-not-allowed'}`}>
                        {product.inStock ? 'В корзину' : 'Под заказ'}

                    </button>
                </div>
            </div >
        );
    }
};
