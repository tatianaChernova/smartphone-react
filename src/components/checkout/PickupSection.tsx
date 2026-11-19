// src/components/checkout/PickupSection.tsx
import React, { useState } from "react";

import { useSelectedPickupPoint } from "../../hooks/useSelectedPickupPoint";
import { useCheckoutStore } from "../../store/checkoutStore";
import { formatPickupAddress } from "../../utils/formatPickupAddress";

import { PickupPointModal } from "./PickupPointModal";
import { EditIcon } from "../../ui/icons/EditIcon";

export const PickupSection: React.FC = () => {
    const { points, loading, selected } = useSelectedPickupPoint();
    const setPickupPoint = useCheckoutStore((s) => s.setPickupPoint);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="rounded-lg border border-custom-secondary">
            <div className="px-4 py-3 border-b border-custom-secondary">
                <h2 className="text-xl">Самовывоз</h2>
            </div>

            <div className="p-4 flex items-start justify-between gap-4">
                <div>
                    <div className="mb-2 text-sm font-medium">Адрес пункта выдачи:</div>
                    <div className="text-sm text-custom-dark-grey">
                        {selected
                            ? formatPickupAddress(selected)
                            : loading
                                ? "Загрузка..."
                                : "Пункт не выбран"}
                    </div>
                    {selected && (
                        <div className="mt-1 text-xs text-custom-grey">{selected.workingHours}</div>
                    )}
                </div>

                <button
                    type="button"
                    aria-label="Выбрать пункт выдачи"
                    onClick={() => setIsModalOpen(true)}
                    className="shrink-0 text-custom-dark-grey hover:text-custom-secondary transition-colors"
                >
                    <EditIcon className="w-9 h-9" />
                </button>
            </div>

            <PickupPointModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                points={points}
                selectedId={selected?.id ?? null}
                onSelect={setPickupPoint}
            />
        </div>
    );
};