// src/components/FavoriteButton.tsx
import React from "react";
import { useFavoritesStore } from "../store/favoritesStore";
import { HeartIcon } from "../ui/icons/HeartIcon";

interface Props {
    productId: number;
    className?: string;
}

export const FavoriteButton: React.FC<Props> = ({ productId, className = "" }) => {
    // селектор возвращает boolean, поэтому компонент перерисуется только при смене своего состояния
    const isFavorite = useFavoritesStore((s) => s.ids.includes(productId));
    const toggle = useFavoritesStore((s) => s.toggle);

    return (
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();   // пригодится, когда кнопка будет внутри <Link> карточки
                e.stopPropagation();
                toggle(productId);
            }}
            aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
            aria-pressed={isFavorite}
            className={`w-11 h-11 flex items-center justify-center rounded-lg bg-custom-bg shadow-[1px_1px_20px_0_rgba(0,0,0,0.10)] transition-transform hover:scale-105 ${className}`}
        >
            <HeartIcon
                className={`transition-colors ${isFavorite ? "fill-current text-custom-secondary" : "text-custom-dark"
                    }`}
            />
        </button>
    );
};