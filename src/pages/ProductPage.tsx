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


                    <div className="flex justify-between items-start gap-10">
                        {/* Слайдер изображений */}
                        <div className="relative shrink-0 max-w-103">
                            {discount && (
                                <div className="absolute top-0 right-0 bg-custom-tertiary text-lg px-2 py-1 z-4 rounded-lg">
                                    -{discount}%
                                </div>
                            )}
                            <Swiper
                                modules={[Pagination]}
                                pagination={{ clickable: true }}
                                className="h-full product-image-swiper"
                            >
                                {product.images.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="h-54 md:h-147 flex items-center justify-center">
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
                        <div className="max-w-90 w-full flex flex-col gap-5">
                            <h1 className="text-3xl">
                                {product.name}
                            </h1>

                            {product.colors?.length && (
                                <div className="mb-3 flex flex-col gap-4">
                                    <h3 className="text-[18px]">Цвет: {selectedColor?.name}</h3>

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


                            <h3 className="text-[18px]">Характеристики:</h3>

                            <dl className="space-y-3 mb-8">

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


                        <div className="p-10 bg-[#E7E7ED] rounded-lg max-w-85 w-full">
                            <div className="text-2xl mb-7">
                                {formatPrice(product.price)} ₽
                            </div>
                            <button
                                className="w-full py-2.5 rounded-lg text-white font-medium transition-colors duration-300 bg-custom-primary hover:bg-custom-secondary"
                            >
                                В корзину
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default ProductPage;