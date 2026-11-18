// src/components/product/ColorPicker.tsx
import React from "react";
import type { ProductColor } from "../../types/product";

interface Props {
    colors: ProductColor[];
    selected: ProductColor | null;
    onSelect: (color: ProductColor) => void;
}

export const ColorPicker: React.FC<Props> = ({ colors, selected, onSelect }) => (
    <div className="mb-3 flex flex-col gap-4">
        <h3 className="text-[16px] md:text-[18px]">Цвет: {selected?.name}</h3>

        <div className="flex gap-5">
            {colors.map((color) => (
                <button
                    key={color.value}
                    type="button"
                    onClick={() => onSelect(color)}
                    aria-label={color.name}
                    aria-pressed={selected?.value === color.value}
                    className={`w-10 h-10 rounded-lg ${color.value === "#FFFFFF" ? "border border-gray-500" : ""}`}
                    style={{ backgroundColor: color.value }}
                />
            ))}
        </div>
    </div>
);