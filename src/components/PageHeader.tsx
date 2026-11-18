// src/components/PageHeader.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "../ui/icons/BackIcon";

interface Props {
    title: string;
    showBack?: boolean;
    as?: "h1" | "span";   // на странице товара h1 уже занят названием товара
}

export const PageHeader: React.FC<Props> = ({ title, showBack = true, as: Tag = "h1" }) => {
    const navigate = useNavigate();

    return (
        <div className="mb-8 flex items-center gap-5">
            {showBack && (
                <button type="button" onClick={() => navigate(-1)} aria-label="Назад">
                    <BackIcon className="w-4 h-4 md:w-5 md:h-7" />
                </button>
            )}
            <Tag className="text-xl md:text-[32px]">{title}</Tag>
        </div>
    );
};