// src/components/catalog/CatalogToolbar.tsx
import React from "react";

import { GridIcon } from "../../ui/icons/GridIcon";
import { ListIcon } from "../../ui/icons/ListIcon";
import { SortIcon } from "../../ui/icons/SortIcon";
import { FilterIcon } from "../../ui/icons/FilterIcon";

export type ViewMode = "grid" | "list";

interface Props {
    view: ViewMode;
    onViewChange: (view: ViewMode) => void;
    onOpenFilters: () => void;
}

const viewButtonClasses = (active: boolean) =>
    `transition-all duration-200 ${active ? "text-custom-dark" : "text-custom-grey hover:text-custom-primary"}`;

export const CatalogToolbar: React.FC<Props> = ({ view, onViewChange, onOpenFilters }) => (
    <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <button type="button" className="mr-auto w-full sm:w-fit lg:mr-0 flex items-center gap-3">
            <SortIcon />
            <span>По популярности</span>
        </button>

        <button
            type="button"
            onClick={onOpenFilters}
            className="flex items-center gap-3 lg:hidden"
        >
            <FilterIcon />
            Фильтры
        </button>

        <div className="flex justify-end gap-3">
            <button
                type="button"
                aria-label="Плитка"
                aria-pressed={view === "grid"}
                onClick={() => onViewChange("grid")}
                className={viewButtonClasses(view === "grid")}
            >
                <GridIcon />
            </button>
            <button
                type="button"
                aria-label="Список"
                aria-pressed={view === "list"}
                onClick={() => onViewChange("list")}
                className={viewButtonClasses(view === "list")}
            >
                <ListIcon />
            </button>
        </div>
    </div>
);