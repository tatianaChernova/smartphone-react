// src/components/cart/CartToolbar.tsx
import React from "react";
import { useCartStore } from "../../store/cartStore";
import { Checkbox } from "../Checkbox";
import { DeleteIcon } from "../../ui/icons/DeleteIcon";

interface Props {
    selectedCount: number;
    allSelected: boolean;
}

export const CartToolbar: React.FC<Props> = ({ selectedCount, allSelected }) => {
    const setAllSelected = useCartStore((s) => s.setAllSelected);
    const removeSelected = useCartStore((s) => s.removeSelected);

    return (
        <div className="py-4 flex items-center justify-between border-b border-custom-accent">
            <button
                type="button"
                onClick={removeSelected}
                disabled={selectedCount === 0}
                className={`flex items-center gap-3 text-custom-dark-grey hover:text-custom-secondary transition-colors ${
                    selectedCount === 0 ? "invisible" : ""
                }`}
            >
                <DeleteIcon className="w-5 h-6" />
                <span>Удалить</span>
            </button>

            <Checkbox checked={allSelected} onChange={setAllSelected}>
                Выбрать всё
            </Checkbox>
        </div>
    );
};