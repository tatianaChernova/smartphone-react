// src/components/cart/EmptyCart.tsx
import React from "react";
import { Link } from "react-router-dom";
import { RecommendedProducts } from "../product/RecommendedProducts";

export const EmptyCart: React.FC = () => (
    <div className="flex flex-col items-center text-center gap-6">
        <h2 className=" text-xl font-medium">Ваша корзина пуста</h2>
        <div className="w-68 md:w-120 max-w-full">
            <img
                src="/images/empty-cart.png"
                alt=""
            />
        </div>
        <div className="text-custom-dark-grey">Добавьте товары из каталога</div>

        <Link
            to="/catalog"
            className="block w-full max-w-72 py-3 rounded-lg text-center text-white font-medium transition-colors duration-300 bg-custom-primary hover:bg-custom-secondary"
        >
            Перейти в каталог
        </Link>

        <RecommendedProducts className="self-stretch -mx-4 md:mx-0" />
    </div>
);