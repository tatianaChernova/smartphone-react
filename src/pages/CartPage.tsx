// src/pages/CartPage.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useCartStore } from "../store/cartStore";
import { useCartDetails } from "../hooks/useCartDetails";
import { formatPrice } from "../utils/formatPrice";

import { FavoriteButton } from "../components/FavoriteButton";

import { BackIcon } from "../ui/icons/BackIcon";
import { DeleteIcon } from "../ui/icons/DeleteIcon";

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const { lines, total, count, loading } = useCartDetails();
    const setQuantity = useCartStore((s) => s.setQuantity);
    const remove = useCartStore((s) => s.remove);
    const clear = useCartStore((s) => s.clear);

    if (loading) {
        return <div className="py-10 container">Загрузка корзины...</div>;
    }

    return (
        <motion.div
            className="pb-30"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ type: "spring", stiffness: 100, damping: 15, mass: 0.8 }}
        >
            <section>
                <div className="container">
                    {/* Хлебные крошки */}
                    <div className="text-sm text-gray-500 mb-6">
                        <Link to="/" className="hover:text-gray-700">
                            Главная
                        </Link>
                        {" / "}
                        <span className="text-black">Корзина</span>
                    </div>

                    <div className="mb-8 flex items-center gap-5">
                        <button type="button" onClick={() => navigate(-1)}>
                            <BackIcon className="w-4 h-4 md:w-5 md:h-7" />
                        </button>
                        <h1 className="text-xl md:text-[32px]">Корзина</h1>
                    </div>

                    {lines.length === 0 ? (
                        <div className="flex flex-col items-center gap-3">
                            <div className="text-center">
                                В корзине пока ничего нет
                            </div>
                            <Link to="/catalog" className="px-4 py-2.5 rounded-lg  font-medium transition-colors duration-300 bg-custom-primary text-white hover:bg-custom-secondary w-full sm:w-fit">Перейти в каталог</Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row items-start gap-10">
                            {/* Список позиций */}
                            <div className="w-full flex-1">
                                {lines.map(({ product, color, colorValue, quantity }) => (
                                    <div
                                        key={`${product.id}-${colorValue ?? ""}`}
                                        className="py-6 flex gap-4 md:gap-6 border-t border-custom-accent"
                                    >
                                        <Link to={`/product/${product.id}`} className="w-24 md:w-36 shrink-0">
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-24 md:h-36 object-contain rounded-lg"
                                            />
                                        </Link>

                                        <div className="flex-1 flex flex-col gap-2">
                                            <Link to={`/product/${product.id}`} className="text-base md:text-xl leading-6 md:leading-8">
                                                {product.name}
                                            </Link>

                                            {color && (
                                                <div className="flex items-center gap-2 text-sm text-custom-dark-grey">
                                                    <span
                                                        className={`w-4 h-4 rounded ${color.value === "#FFFFFF" ? "border border-gray-500" : ""}`}
                                                        style={{ backgroundColor: color.value }}
                                                    />
                                                    {color.name}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">{formatPrice(product.price)} ₽</span>
                                                {product.oldPrice && (
                                                    <span className="text-sm text-custom-grey line-through font-light">
                                                        {formatPrice(product.oldPrice)} ₽
                                                    </span>
                                                )}
                                            </div>

                                            {/* Количество + избранное */}
                                            <div className="mt-auto flex items-center gap-4">
                                                <div className="flex items-center w-fit rounded-lg border border-custom-accent">
                                                    <button
                                                        type="button"
                                                        aria-label="Уменьшить количество"
                                                        onClick={() => setQuantity(product.id, colorValue, quantity - 1)}
                                                        className="w-9 h-9 flex items-center justify-center hover:text-custom-primary transition-colors"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-8 text-center select-none">{quantity}</span>
                                                    <button
                                                        type="button"
                                                        aria-label="Увеличить количество"
                                                        onClick={() => setQuantity(product.id, colorValue, quantity + 1)}
                                                        className="w-9 h-9 flex items-center justify-center hover:text-custom-primary transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <FavoriteButton productId={product.id} />
                                            </div>
                                        </div>

                                        {/* Удалить + сумма по позиции */}
                                        <div className="flex flex-col items-end justify-between">
                                            <button
                                                type="button"
                                                aria-label="Удалить из корзины"
                                                onClick={() => remove(product.id, colorValue)}
                                                className="text-custom-grey hover:text-custom-secondary transition-colors"
                                            >
                                                <DeleteIcon className="w-4 h-5" />
                                            </button>
                                            <span className="text-lg md:text-xl font-medium whitespace-nowrap">
                                                {formatPrice(product.price * quantity)} ₽
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={clear}
                                    className="mt-2 text-sm text-custom-grey hover:text-custom-secondary transition-colors"
                                >
                                    Очистить корзину
                                </button>
                            </div>

                            {/* Итого */}
                            <div className="w-full lg:max-w-85 p-6 md:p-10 bg-[#E7E7ED] rounded-lg lg:sticky lg:top-4">
                                <div className="mb-2 flex justify-between text-custom-dark-grey">
                                    <span>Товары ({count})</span>
                                    <span>{formatPrice(total)} ₽</span>
                                </div>
                                <div className="mb-7 flex justify-between items-center text-2xl">
                                    <span>Итого</span>
                                    <span>{formatPrice(total)} ₽</span>
                                </div>
                                <Link
                                    to="/checkout"
                                    className="block w-full py-2.5 rounded-lg text-center text-white font-medium transition-colors duration-300 bg-custom-primary hover:bg-custom-secondary"
                                >
                                    Оформить заказ
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </motion.div>
    );
};

export default CartPage;