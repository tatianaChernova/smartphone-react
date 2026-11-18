// src/components/Checkbox.tsx
import React from "react";
import { CheckIcon } from "../ui/icons/CheckIcon";

interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
    ariaLabel?: string;
    className?: string;
    children?: React.ReactNode;
    labelPosition?: "left" | "right";   // где подпись относительно квадрата
    size?: "md" | "sm";                 // md = 24×24 (корзина), sm = 16×16 (фильтры)
}

const SIZES = {
    md: { box: "w-6 h-6 rounded-md", check: "w-3.5 h-3.5", gap: "gap-3" },
    sm: { box: "w-4 h-4 rounded", check: "w-2.5 h-2.5", gap: "gap-2" },
};

export const Checkbox: React.FC<Props> = ({
    checked,
    onChange,
    ariaLabel,
    className = "",
    children,
    labelPosition = "left",
    size = "md",
}) => {
    const s = SIZES[size];

    return (
        <label className={`flex w-fit items-center ${s.gap} cursor-pointer select-none ${className}`}>
            {labelPosition === "left" && children}
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                aria-label={ariaLabel}
                className="peer sr-only"
            />
            <span
                className={`${s.box} shrink-0 border-2 border-custom-primary flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-custom-secondary`}
            >
                {checked && <CheckIcon className={s.check} />}
            </span>
            {labelPosition === "right" && children}
        </label>
    );
};