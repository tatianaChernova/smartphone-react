// src/components/QuantityStepper.tsx
import React from "react";

interface Props {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    className?: string;
}

export const QuantityStepper: React.FC<Props> = ({ value, onChange, min = 1, className = "" }) => (
    <div className={`flex items-center h-8 rounded-lg border border-custom-secondary text-custom-secondary ${className}`}>
        <button
            type="button"
            aria-label="Уменьшить количество"
            disabled={value <= min}
            onClick={() => onChange(value - 1)}
            className="w-8 h-full flex items-center justify-center text-xl disabled:text-custom-grey disabled:cursor-not-allowed"
        >
            −
        </button>
        <span className="w-8 text-center text-black select-none">{value}</span>
        <button
            type="button"
            aria-label="Увеличить количество"
            onClick={() => onChange(value + 1)}
            className="w-8 h-full flex items-center justify-center text-xl"
        >
            +
        </button>
    </div>
);