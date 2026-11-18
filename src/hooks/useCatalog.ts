// src/hooks/useCatalog.ts
import { useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { ProductItem } from "../types/product";
import type { CategoryItem } from "../types/category";

import { getProducts } from "../api/products";
import { getCategories } from "../api/categories";
import { toggleValue } from "../utils/toggleValue";

export interface CatalogFilters {
    storage: number[];
    ram: number[];
    brands: string[];
    cores: number[];
    price: number[];
}

export interface CatalogOptions {
    storage: number[];
    ram: number[];
    brands: string[];
    cores: number[];
    minPrice: number;
    maxPrice: number;
}

export interface CatalogActions {
    toggleStorage: (value: number) => void;
    toggleRam: (value: number) => void;
    toggleBrand: (value: string) => void;
    toggleCore: (value: number) => void;
    setPrice: Dispatch<SetStateAction<number[]>>;
}

const uniqueNumbers = (values: (number | undefined)[]) =>
    Array.from(new Set(values.filter((v): v is number => typeof v === "number"))).sort(
        (a, b) => a - b
    );

const uniqueStrings = (values: (string | undefined)[]) =>
    Array.from(new Set(values.filter((v): v is string => typeof v === "string")));

// ничего не выбрано — товар подходит; иначе его значение должно быть среди выбранных
function matches<T>(selected: T[], value: T | undefined) {
    return !selected.length || (value !== undefined && selected.includes(value));
}

export function useCatalog(categoryId: number | null) {
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);

    const [storage, setStorage] = useState<number[]>([]);
    const [ram, setRam] = useState<number[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [cores, setCores] = useState<number[]>([]);
    const [price, setPrice] = useState<number[]>([0, 0]);

    useEffect(() => {
        getProducts().then((data) => {
            setProducts(data);
            const prices = data.map((p) => p.price);
            if (prices.length > 0) {
                setPrice([Math.min(...prices), Math.max(...prices)]);
            }
        });
        getCategories().then(setCategories);
    }, []);

    const options: CatalogOptions = useMemo(() => {
        const prices = products.map((p) => p.price);
        return {
            storage: uniqueNumbers(products.map((p) => p.attributes?.storage)),
            ram: uniqueNumbers(products.map((p) => p.attributes?.ram)),
            brands: uniqueStrings(products.map((p) => p.attributes?.brand)),
            cores: uniqueNumbers(products.map((p) => p.attributes?.cores)),
            minPrice: prices.length ? Math.min(...prices) : 0,
            maxPrice: prices.length ? Math.max(...prices) : 0,
        };
    }, [products]);

    const filteredProducts = useMemo(
        () =>
            products.filter(
                (p) =>
                    (categoryId === null || p.categoryId === categoryId) &&
                    p.price >= price[0] &&
                    p.price <= price[1] &&
                    matches(brands, p.attributes?.brand) &&
                    matches(ram, p.attributes?.ram) &&
                    matches(storage, p.attributes?.storage) &&
                    matches(cores, p.attributes?.cores)
            ),
        [products, categoryId, price, brands, ram, storage, cores]
    );

    const currentCategory =
        categoryId === null ? undefined : categories.find((c) => Number(c.id) === categoryId);

    const filters: CatalogFilters = { storage, ram, brands, cores, price };

    const actions: CatalogActions = {
        toggleStorage: (value) => setStorage((prev) => toggleValue(prev, value)),
        toggleRam: (value) => setRam((prev) => toggleValue(prev, value)),
        toggleBrand: (value) => setBrands((prev) => toggleValue(prev, value)),
        toggleCore: (value) => setCores((prev) => toggleValue(prev, value)),
        setPrice,
    };

    return {
        loading: !products.length || !categories.length,
        categories,
        currentCategory,
        filteredProducts,
        filters,
        options,
        actions,
    };
}