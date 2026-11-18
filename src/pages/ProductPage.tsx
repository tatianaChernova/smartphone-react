// src/pages/ProductPage.tsx
import React from "react";
import { useParams } from "react-router-dom";

import { useProduct } from "../hooks/useProduct";
import { ProductDetails } from "../components/product/ProductDetails";

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { product, loading } = useProduct(id);

    if (loading) {
        return <div className="container py-10">Загрузка товара...</div>;
    }

    if (!product) {
        return <div className="container py-10">Товар не найден</div>;
    }

    return <ProductDetails key={product.id} product={product} />;
};

export default ProductPage;