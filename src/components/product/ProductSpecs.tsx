// src/components/product/ProductSpecs.tsx
import React from "react";
import type { ProductAttributes } from "../../types/product";

interface Props {
    attributes?: ProductAttributes;
}

const withUnit = (value: number | undefined, unit: string) =>
    value == null ? undefined : `${value} ${unit}`;

export const ProductSpecs: React.FC<Props> = ({ attributes }) => {
    if (!attributes) return null;

    const rows: { label: string; value?: string | number }[] = [
        { label: "Бренд", value: attributes.brand },
        { label: "Экран", value: attributes.screenSize == null ? undefined : `${attributes.screenSize}"` },
        { label: "Количество ядер", value: attributes.cores },
        { label: "Мощность блока питания", value: withUnit(attributes.powerSupply, "Вт") },
        { label: "Оперативная память", value: withUnit(attributes.ram, "ГБ") },
        { label: "Встроенная память", value: withUnit(attributes.storage, "ГБ") },
        { label: "Основная камера", value: withUnit(attributes.mainCamera, "Мп") },
    ].filter((row) => row.value != null && row.value !== "");

    if (!rows.length) return null;

    return (
        <>
            <h3 className="text-[16px] md:text-[18px]">Характеристики:</h3>

            <dl className="space-y-3 mb-8 text-[14px] md:text-[18px] font-light">
                {rows.map(({ label, value }) => (
                    <div key={label} className="flex items-end gap-2">
                        <dt>{label}:</dt>
                        <span className="flex-1 border-b border-custom-dark-grey" />
                        <dd>{value}</dd>
                    </div>
                ))}
            </dl>
        </>
    );
};