import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { Pagination } from 'swiper/modules';
import { motion } from "framer-motion";

import type { ProductColor, ProductItem } from "../types/product";

import { getProducts } from "../api/products";
import { getDiscountPercent } from "../utils/getDiscountPercent";

import { formatPrice } from "../utils/formatPrice";

import { BackIcon } from "../ui/icons/BackIcon";
import { FavoriteButton } from "../components/FavoriteButton";
import { AddToCartButton } from "../components/product/AddToCartButton";

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<ProductItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);

    useEffect(() => {
        getProducts().then((data) => {
            const currentProduct = data.find(
                p => Number(p.id) === Number(id)
            );

            setProduct(currentProduct || null);
            setSelectedColor(currentProduct?.colors?.[0] ?? null);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="container py-10">
                Загрузка товара...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container py-10">
                Товар не найден
            </div>
        );
    }

    const discount = getDiscountPercent(product.price, product.oldPrice);

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
                    <div className="text-sm text-custom-grey mb-6">
                        <Link to="/" className="hover:text-gray-700">
                            Главная
                        </Link>
                        {" / "}
                        <Link to="/catalog" className="hover:text-gray-700">
                            Каталог
                        </Link>
                        {" / "}
                        <span className="text-custom-dark-grey">{product.name}</span>
                    </div>


                    <div className="mb-8 flex items-center gap-5">
                        <button type="button" onClick={() => navigate(-1)}>
                            <BackIcon className="w-4 h-4 md:w-5 md:h-7" />
                        </button>

                        <span className="text-xl md:text-[32px]">Карточка товара</span>
                    </div>

                    <div className="pb-28 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[26rem_minmax(0,1fr)_21rem] items-start gap-6 md:gap-10">
                        {/* Слайдер изображений */}
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

                        {/* Информация */}
                        <div className="min-w-0 w-full flex flex-col gap-5">
                            <h1 className="text-xl md:text-3xl">
                                {product.name}
                            </h1>

                            {product.colors?.length && (
                                <div className="mb-3 flex flex-col gap-4">
                                    <h3 className="text-[16px] md:text-[18px]">Цвет: {selectedColor?.name}</h3>

                                    <div className="flex gap-5">
                                        {product.colors?.map((color) => (
                                            <button
                                                key={color.value}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-10 h-10 rounded-lg ${color.value === "#FFFFFF" ? "border border-gray-500" : ""}`}
                                                style={{ backgroundColor: color.value }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <h3 className="text-[16px] md:text-[18px]">Характеристики:</h3>

                            <dl className="space-y-3 mb-8 text-[14px] md:text-[18px] font-weight-300">

                                {product.attributes?.brand && (
                                    <div className="flex items-end gap-2">
                                        <dt>Бренд:</dt>
                                        <span className="flex-1 border-b border-custom-dark-grey"></span>
                                        <dd>{product.attributes.brand}</dd>
                                    </div>
                                )}

                                {product.attributes?.screenSize && (
                                    <div className="flex items-end gap-2">
                                        <dt>Экран:</dt>
                                        <span className="flex-1 border-b border-custom-dark-grey"></span>
                                        <dd>{product.attributes.screenSize}"</dd>
                                    </div>
                                )}

                                {product.attributes?.cores && (
                                    <div className="flex items-end gap-2">
                                        <dt>Количество ядер:</dt>
                                        <span className="flex-1 border-b border-custom-dark-grey"></span>
                                        <dd>{product.attributes.cores}</dd>
                                    </div>
                                )}

                                {product.attributes?.powerSupply && (
                                    <div className="flex items-end gap-2">
                                        <dt>Мощность блока питания:</dt>
                                        <span className="flex-1 border-b border-custom-dark-grey"></span>
                                        <dd>{product.attributes.powerSupply} Вт</dd>
                                    </div>
                                )}

                                {product.attributes?.ram && (
                                    <div className="flex items-end gap-2">
                                        <dt>Оперативная память:</dt>
                                        <span className="flex-1 border-b border-custom-dark-grey"></span>
                                        <dd>{product.attributes.ram} ГБ</dd>
                                    </div>
                                )}

                                {product.attributes?.storage && (
                                    <div className="flex items-end gap-2">
                                        <dt>Встроенная память:</dt>
                                        <span className="flex-1 border-b border-custom-dark-grey"></span>
                                        <dd>{product.attributes.storage} ГБ</dd>
                                    </div>
                                )}

                                {product.attributes?.mainCamera && (
                                    <div className="flex items-end gap-2">
                                        <dt>Основная камера:</dt>
                                        <span className="flex-1 border-b border-custom-dark-grey"></span>
                                        <dd>{product.attributes.mainCamera} Мп</dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {/* Цена и кнопка */}
                        <div className="fixed bottom-24 h-26 left-0 z-20 flex items-center justify-between gap-4 p-4 w-full bg-custom-bg border-t border-custom-light md:border-0 md:static md:h-[unset] xl:block md:p-10 md:col-span-2 xl:col-span-1 md:bg-[#E7E7ED] md:rounded-lg md:shadow-none">
                            <div className="text-xl md:text-2xl mb-0 xl:mb-7 whitespace-nowrap">
                                {formatPrice(product.price)} ₽
                            </div>

                            <AddToCartButton
                                product={product}
                                colorValue={selectedColor?.value}
                                className="flex-1 max-w-100 md:w-full"
                            />
                        </div>
                    </div>

                </div>
            </section>
        </motion.div>
    );
};

export default ProductPage;