// src/components/catalog/FiltersPanel.tsx
import React from "react";
import { Link } from "react-router-dom";

import type { CategoryItem } from "../../types/category";
import type { CatalogActions, CatalogFilters, CatalogOptions } from "../../hooks/useCatalog";

import PriceSlider from "../PriceSlider";
import { CheckboxFilterGroup } from "./CheckboxFilterGroup";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    categories?: CategoryItem[];   // передаём только на общей странице каталога
    filters: CatalogFilters;
    options: CatalogOptions;
    actions: CatalogActions;
}

export const FiltersPanel: React.FC<Props> = ({
    isOpen,
    onClose,
    categories,
    filters,
    options,
    actions,
}) => (
    <aside
        className={`
            fixed top-0 left-0 h-full max-w-full w-full lg:max-w-72 bg-white z-50 p-4
            transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full"}
            lg:static lg:translate-x-0 lg:h-fit lg:rounded-lg lg:bg-custom-bg lg:shadow-[1px_1px_20px_0_rgba(0,0,0,0.1)]
        `}
    >
        <div className="flex justify-between items-center mb-4 lg:hidden">
            <span className="font-medium">Фильтры</span>
            <button type="button" onClick={onClose} aria-label="Закрыть фильтры">
                ✕
            </button>
        </div>

        {categories && (
            <div className="mb-5">
                <div className="font-medium mb-4">Категории</div>
                <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            to={`/catalog/${cat.id}`}
                            onClick={onClose}
                            className="text-sm hover:text-custom-primary transition-colors"
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </div>
        )}

        <PriceSlider
            price={filters.price}
            setPrice={actions.setPrice}
            min={options.minPrice}
            max={options.maxPrice}
        />

        <CheckboxFilterGroup
            title="Встроенная память"
            options={options.storage}
            selected={filters.storage}
            onToggle={actions.toggleStorage}
            unit="ГБ"
        />
        <CheckboxFilterGroup
            title="Оперативная память"
            options={options.ram}
            selected={filters.ram}
            onToggle={actions.toggleRam}
            unit="ГБ"
        />
        <CheckboxFilterGroup
            title="Бренд"
            options={options.brands}
            selected={filters.brands}
            onToggle={actions.toggleBrand}
        />
        <CheckboxFilterGroup
            title="Ядра CPU"
            options={options.cores}
            selected={filters.cores}
            onToggle={actions.toggleCore}
        />

        <button
            type="button"
            onClick={onClose}
            className="mt-6 lg:hidden w-full py-2.5 rounded-lg text-white font-medium transition-colors duration-300 bg-custom-primary hover:bg-custom-secondary"
        >
            Применить
        </button>
    </aside>
);