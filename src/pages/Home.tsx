import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/navigation';

import type { BannerItem } from "../types/banner";
import type { ProductItem } from "../types/product";
import type { CategoryItem } from "../types/category";

import { getBanners } from "../api/banners";
import { getProducts } from "../api/products";
import { getCategories } from "../api/categories";

import { ChevronLeftIcon } from '../ui/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '../ui/icons/ChevronRightIcon';

import { ProductCard } from "../components/product/ProductCard";

const Home: React.FC = () => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [banners, setBanners] = useState<BannerItem[]>([]);

    const promoProducts = useMemo(() => {
        return products.filter(p => p.oldPrice && p.oldPrice > p.price);
    }, [products]);

    useEffect(() => {
        getBanners().then(setBanners);
        getProducts().then(setProducts);
        getCategories().then(setCategories);
    }, []);

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
            {banners?.length > 0 && (
                <section className="banner">
                    <div className="container">
                        <div className="relative">
                            <button className="hidden banner-nav-prev absolute left-6 top-[calc(50%-26px)] z-10 w-13 h-13 md:flex items-center justify-center text-custom-light transition-all duration-300  hover:text-custom-primary cursor-pointer disabled:hidden">
                                <ChevronLeftIcon />
                            </button>
                            <button className="hidden banner-nav-next absolute right-6 top-[calc(50%-26px)] z-10 w-13 h-13 md:flex items-center justify-center text-custom-light transition-all duration-300  hover:text-custom-primary cursor-pointer disabled:hidden">
                                <ChevronRightIcon />
                            </button>
                            <Swiper
                                modules={[Navigation, Autoplay]}
                                spaceBetween={16}
                                slidesPerView={1.5}
                                centeredSlides={true}
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                navigation={{
                                    prevEl: '.banner-nav-prev',
                                    nextEl: '.banner-nav-next',
                                }}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 1,
                                        centeredSlides: false,
                                    },
                                }}
                                className="category-slider"
                            >
                                {banners.map((banner, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="p-6 md:py-7.5 md:px-24 xl:pl-60 xl:pr-42 relative w-full h-37.25 md:h-65 text-white flex gap-5 bg-custom-dark rounded-lg transition duration-300">

                                            <div className="w-full relative z-3">
                                                <h2 className="mb-5 text-xl md:text-[40px]">
                                                    {banner.title}
                                                </h2>

                                                {banner.subtitle1 && (
                                                    <div className="text-sm md:text-[32px] leading-[140.188%] text-custom-tertiary">
                                                        {banner.subtitle1}
                                                    </div>
                                                )}

                                                {banner.subtitle2 && (
                                                    <div className="text-sm md:text-[32px] leading-[140.188%]">
                                                        {banner.subtitle2}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="max-w-90 w-auto h-30 md:max-w-120 aspect-3/2 md:h-64 absolute bottom-0 right-4 lg:right-42">
                                                <img src={banner.image} alt={banner.title} />
                                            </div>

                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
            )}
            {categories?.length > 0 && (
                <section className="catalog">
                    <div className="container">
                        <div className="">
                            <div className="flex justify-between gap-5">
                                <h1 className="text-xl leading-none md:text-[32px]">Каталог</h1>
                                <div className="hidden md:flex justify-end gap-2">
                                    <button className="catalog-nav-prev w-13 h-13 flex items-center justify-center text-custom-dark transition-all duration-300  hover:text-custom-primary cursor-pointer disabled:text-custom-light">
                                        <ChevronLeftIcon />
                                    </button>
                                    <button className="catalog-nav-next w-13 h-13 flex items-center justify-center text-custom-dark transition-all duration-300  hover:text-custom-primary cursor-pointer disabled:text-custom-light">
                                        <ChevronRightIcon />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-5.5">
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={16}
                                    slidesPerView={3.2}
                                    navigation={{
                                        prevEl: '.catalog-nav-prev',
                                        nextEl: '.catalog-nav-next',
                                    }}
                                    breakpoints={{
                                        768: { slidesPerView: 4 },
                                        1024: { slidesPerView: 6 },
                                    }}
                                    className="category-slider"
                                >
                                    {categories.map((category) => (
                                        <SwiperSlide key={category.id}>
                                            <Link to={`/catalog/${category.id}`} className="flex flex-col items-center justify-center group cursor-pointer">

                                                <div className="p-2 w-full h-32 md:h-52.75 flex items-center justify-center bg-custom-accent rounded-lg">
                                                    <div className="w-auto h-22 md:h-41.75 mb-2 ">
                                                        <img
                                                            src={category.image}
                                                            alt={category.name}
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-base md:text-xl font-light mt-3 text-center">
                                                    {category.name}
                                                </div>

                                            </Link>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {promoProducts?.length > 0 && (
                <section className="promo">
                    <div className="container">
                        <div className="">
                            <div className=" flex justify-between gap-5">
                                <h1 className="text-xl md:text-[32px]">Акции</h1>
                                <div className="hidden md:flex justify-end gap-2">
                                    <button className="products-nav-prev w-13 h-13 flex items-center justify-center text-custom-dark transition-all duration-300 hover:text-custom-primary cursor-pointer disabled:text-custom-light">
                                        <ChevronLeftIcon />
                                    </button>
                                    <button className="products-nav-next w-13 h-13 flex items-center justify-center text-custom-dark transition-all duration-300 hover:text-custom-primary cursor-pointer disabled:text-custom-light">
                                        <ChevronRightIcon />
                                    </button>
                                </div>
                            </div>

                            {/* Slider */}
                            <div className="mt-5.5">
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={32}
                                    slidesPerView={2.3}
                                    navigation={{
                                        prevEl: '.products-nav-prev',
                                        nextEl: '.products-nav-next',
                                    }}
                                    breakpoints={{
                                        768: { slidesPerView: 4 },
                                        1024: { slidesPerView: 5.5, spaceBetween: 16 },
                                    }}
                                >
                                    {promoProducts.map(product => {
                                        return (
                                            <SwiperSlide key={product.id}>
                                                <ProductCard product={product} />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </motion.div>
    );
};

export default Home;