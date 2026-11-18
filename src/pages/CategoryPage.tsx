// src/pages/CategoryPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useCatalog } from "../hooks/useCatalog";

import { PageTransition } from "../components/PageTransition";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PageHeader } from "../components/PageHeader";
import { CatalogToolbar } from "../components/catalog/CatalogToolbar";
import type { ViewMode } from "../components/catalog/CatalogToolbar";
import { FiltersPanel } from "../components/catalog/FiltersPanel";
import { ProductGrid } from "../components/catalog/ProductGrid";

const CategoryPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const categoryId = id ? Number(id) : null;
    const isGeneralCatalog = categoryId === null;

    const [view, setView] = useState<ViewMode>("grid");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const { loading, categories, currentCategory, filteredProducts, filters, options, actions } =
        useCatalog(categoryId);

    if (loading) {
        return <div className="py-10 container">Загрузка товаров...</div>;
    }

    return (
        <PageTransition>
            <section>
                <div className="container">
                    <Breadcrumbs
                        items={[
                            { label: "Главная", to: "/" },
                            { label: isGeneralCatalog ? "Каталог" : currentCategory?.name ?? "" },
                        ]}
                    />
                    <PageHeader
                        title={isGeneralCatalog ? "Все товары" : currentCategory?.name ?? ""}
                        showBack={!isGeneralCatalog}
                    />

                    <CatalogToolbar
                        view={view}
                        onViewChange={setView}
                        onOpenFilters={() => setIsFiltersOpen(true)}
                    />

                    <div className="flex items-start gap-18.75">
                        <FiltersPanel
                            isOpen={isFiltersOpen}
                            onClose={() => setIsFiltersOpen(false)}
                            categories={isGeneralCatalog ? categories : undefined}
                            filters={filters}
                            options={options}
                            actions={actions}
                        />
                        <ProductGrid products={filteredProducts} view={view} />
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default CategoryPage;