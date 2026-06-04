import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import type { ProductItem } from "../types/product";
import type { CategoryItem } from "../types/category";

import { getProducts } from "../api/products";
import { getCategories } from "../api/categories";

import PriceSlider from "../components/PriceSlider";

import { BackIcon } from "../ui/icons/BackIcon";
import { CheckIcon } from "../ui/icons/CheckIcon";
import { ProductCard } from "../components/product/ProductCard";
import { GridIcon } from "../ui/icons/GridIcon";
import { ListIcon } from "../ui/icons/ListIcon";
import { SortIcon } from "../ui/icons/SortIcon";
import { FilterIcon } from "../ui/icons/FilterIcon";

const CategoryPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isGeneralCatalog = !id; // Проверяем, общая ли это страница
    const categoryId = id ? Number(id) : null;

    const [products, setProducts] = useState<ProductItem[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const [storage, setStorage] = useState<number[]>([]);
    const [ram, setRam] = useState<number[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [cores, setCores] = useState<number[]>([]);

    const prices = products.map(p => p.price);

    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;

    const [price, setPrice] = useState<number[]>([0, 0]);

    useEffect(() => {
        getProducts().then(data => {
            setProducts(data);
            const prices = data.map(p => p.price);
            if (prices.length > 0) {
                setPrice([Math.min(...prices), Math.max(...prices)]);
            }
        });
        getCategories().then(setCategories);
    }, [id]);


    const navigate = useNavigate();
    const currentCategory = categories.find(
        c => Number(c.id) === Number(id)
    );


    // Уникальная встроенная память (storage)
    const uniqueStorage: number[] = Array.from(
        new Set(
            products
                .map(p => p.attributes?.storage)
                .filter((s): s is number => typeof s === 'number') // оставляем только числа
        )
    ).sort((a, b) => a - b);

    // Уникальная RAM
    const uniqueRAM: number[] = Array.from(
        new Set(
            products
                .map(p => p.attributes?.ram)
                .filter((r): r is number => typeof r === 'number')
        )
    ).sort((a, b) => a - b);

    // Уникальные бренды
    const uniqueBrands: string[] = Array.from(
        new Set(
            products
                .map(p => p.attributes?.brand)
                .filter((b): b is string => typeof b === 'string')
        )
    );

    // Уникальные ядра CPU
    const uniqueCores: number[] = Array.from(
        new Set(
            products
                .map(p => p.attributes?.cores)
                .filter((c): c is number => typeof c === 'number')
        )
    ).sort((a, b) => a - b);

    const filteredProducts = products.filter(p => {
        return (
            (isGeneralCatalog || p.categoryId === categoryId) &&
            p.price >= price[0] &&
            p.price <= price[1] &&
            (!brands.length || (p.attributes?.brand && brands.includes(p.attributes.brand))) &&
            (!ram.length || (p.attributes?.ram && ram.includes(p.attributes.ram))) &&
            (!storage.length || (p.attributes?.storage && storage.includes(p.attributes.storage))) &&
            (!cores.length || (p.attributes?.cores && cores.includes(p.attributes.cores)))
        );
    });
    if (!products.length || !categories.length) {
        return <div className="py-10 container">Загрузка товаров...</div>;
    }
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
                        Главная / <span className="text-black">{isGeneralCatalog ? 'Каталог' : currentCategory?.name}</span>
                    </div>
                    <div className="mb-8 flex items-center gap-5">
                        {!isGeneralCatalog && (
                            <button type="button" onClick={() => navigate(-1)}>
                                <BackIcon className="w-4 h-4 md:w-5 md:h-7" />
                            </button>
                        )}
                        <h1 className="text-xl md:text-[32px]">{isGeneralCatalog ? 'Все товары' : currentCategory?.name}</h1>
                    </div>

                    <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                        <button type="button" className="mr-auto w-full sm:w-fit lg:mr-0 flex items-center gap-3">
                            <SortIcon />
                            <span>
                                По популярности
                            </span>
                        </button>
                        <button
                            onClick={() => setIsFiltersOpen(true)}
                            className="flex items-center gap-3 lg:hidden"
                        >
                            <FilterIcon />
                            Фильтры
                        </button>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setView('grid')}
                                className={`transition-all duration-200 ${view === 'grid' ? ' text-custom-dark' : 'text-custom-grey hover:text-custom-primary'}`}>
                                <GridIcon />
                            </button>
                            <button
                                onClick={() => setView('list')}
                                className={` transition-all duration©-200 ${view === 'list' ? '  text-custom-dark' : 'text-custom-grey hover:text-custom-primary'}`}>
                                <ListIcon />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-18.75">
                        {/* Фильтры */}
                        <aside className={`
                        fixed top-0 left-0 h-full max-w-full w-full lg:max-w-72 bg-white z-50 p-4
                        transform transition-transform duration-300
                        ${isFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
                        lg:static lg:translate-x-0 lg:h-fit lg:rounded-lg lg:bg-custom-bg lg:shadow-[1px_1px_20px_0_rgba(0,0,0,0.1)]
                        `}
                        >
                            <div className="flex justify-between items-center mb-4 lg:hidden">
                                <span className="font-medium">Фильтры</span>
                                <button onClick={() => setIsFiltersOpen(false)}>✕</button>
                            </div>
                            {isGeneralCatalog && (
                                <div className="mb-5">
                                    <div className="font-medium mb-4">Категории</div>
                                    <div className="flex flex-col gap-2">
                                        {categories.map(cat => (
                                            <button
                                                key={cat.id}
                                                onClick={() => {
                                                    navigate(`/catalog/${cat.id}`);
                                                    setIsFiltersOpen(false);
                                                }}
                                                className="text-left text-sm hover:text-custom-primary transition-colors"
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Цена */}
                            <PriceSlider price={price} setPrice={setPrice} min={minPrice} max={maxPrice} />

                            {/* Storage */}
                            <div className="mb-5">
                                <div className="font-medium mb-4">Встроенная память</div>
                                {uniqueStorage.map((s) => (
                                    <label key={s} className="flex items-center gap-2 cursor-pointer mb-2 select-none">
                                        <input
                                            type="checkbox"
                                            className="hidden peer"
                                            onChange={(e) => setStorage(prev =>
                                                e.target.checked ? [...prev, s] : prev.filter(x => x !== s)
                                            )}
                                        />
                                        <span className="w-5 h-5 rounded-md border-2 border-custom-primary flex items-center justify-center transition-colors duration-200">
                                            {storage.includes(s) && <CheckIcon className="w-3 h-3" />}
                                        </span>
                                        <span className="text-sm">{s} ГБ</span>
                                    </label>
                                ))}
                            </div>


                            {/* RAM */}
                            <div className="mb-5">
                                <div className="font-medium mb-4">Оперативная память</div>
                                {uniqueRAM.map((r) => (
                                    <label key={r} className="flex items-center gap-2 cursor-pointer mb-2 select-none">
                                        <input
                                            type="checkbox"
                                            className="hidden peer"
                                            onChange={(e) => {
                                                setRam(prev =>
                                                    e.target.checked ? [...prev, r] : prev.filter(x => x !== r)
                                                );
                                            }}
                                        />
                                        <span className="w-5 h-5 rounded-md border-2 border-custom-primary flex items-center justify-center transition-colors duration-200">
                                            {ram.includes(r) && <CheckIcon className="w-3 h-3" />}
                                        </span>
                                        <span className="text-sm">{r} ГБ</span>
                                    </label>
                                ))}
                            </div>
                            {/* Бренд */}
                            <div className="mb-5">
                                <div className="font-medium mb-4">Бренд</div>
                                {uniqueBrands.map((b) => (
                                    <label key={b} className="flex items-center gap-2 cursor-pointer mb-2 select-none">
                                        {/* Скрытый чекбокс */}
                                        <input
                                            type="checkbox"
                                            className="hidden peer"
                                            onChange={(e) => {
                                                setBrands((prev) =>
                                                    e.target.checked
                                                        ? [...prev, b]
                                                        : prev.filter((x) => x !== b)
                                                );
                                            }}
                                        />

                                        {/* Кастомный квадрат */}
                                        <span className="w-5 h-5 rounded-md border-2 border-custom-primary flex items-center justify-center transition-colors duration-200">
                                            {brands.includes(b) && <CheckIcon className="w-3 h-3 " />}
                                        </span>

                                        {/* Текст */}
                                        <span className="text-sm">{b}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Ядра */}
                            <div className="mb-5">
                                <div className="font-medium mb-4">Ядра CPU</div>

                                {uniqueCores.map((c) => (
                                    <label key={c} className="flex items-center gap-2 cursor-pointer mb-2 select-none">
                                        <input
                                            type="checkbox"
                                            className="hidden peer"
                                            onChange={(e) => {
                                                setCores(prev =>
                                                    e.target.checked ? [...prev, c] : prev.filter(x => x !== c)
                                                );
                                            }}
                                        />
                                        <span className="w-5 h-5 rounded-md border-2 border-custom-primary flex items-center justify-center transition-colors duration-200">
                                            {cores.includes(c) && <CheckIcon className="w-3 h-3" />}
                                        </span>
                                        <span className="text-sm">{c}</span>
                                    </label>
                                ))}
                            </div>
                            <button type="button"
                                onClick={() => setIsFiltersOpen(false)}
                                className="mt-6 lg:hidden w-full py-2.5 rounded-lg text-white font-medium transition-colors duration-300 
                                    bg-custom-primary hover:bg-custom-secondary">
                                Применить
                            </button>
                        </aside>

                        {/* Сетка товаров*/}
                        <div className={view === 'grid'
                            ? "relative grid grid-cols-2 lg:grid-cols-4 gap-y-4 lg:gap-y-0 gap-x-4"
                            : "w-full flex flex-col"
                        }>
                            {filteredProducts.length === 0 ? (
                                <div className="col-span-full text-center py-10 text-gray-500">
                                    Нет товаров
                                </div>
                            ) : (
                                filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} view={view} />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default CategoryPage;