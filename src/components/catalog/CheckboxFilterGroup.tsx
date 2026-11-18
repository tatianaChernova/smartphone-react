// src/components/catalog/CheckboxFilterGroup.tsx
import React from "react";
import { Checkbox } from "../Checkbox";

interface Props<T extends string | number> {
    title: string;
    options: T[];
    selected: T[];
    onToggle: (value: T) => void;
    unit?: string;   // например "ГБ"
}

export function CheckboxFilterGroup<T extends string | number>({
    title,
    options,
    selected,
    onToggle,
    unit,
}: Props<T>) {
    if (!options.length) return null;

    return (
        <div className="mb-5">
            <div className="font-medium mb-4">{title}</div>
            {options.map((option) => (
                <Checkbox
                    key={option}
                    checked={selected.includes(option)}
                    onChange={() => onToggle(option)}
                    size="sm"
                    labelPosition="right"
                    className="mb-2 text-sm"
                >
                    {unit ? `${option} ${unit}` : option}
                </Checkbox>
            ))}
        </div>
    );
}