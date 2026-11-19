// src/components/checkout/PickupPointModal.tsx
import React, { useEffect, useRef } from "react";
import type { PickupPoint } from "../../types/pickupPoint";
import { formatPickupAddress } from "../../utils/formatPickupAddress";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    points: PickupPoint[];
    selectedId: number | null;
    onSelect: (id: number) => void;
}

export const PickupPointModal: React.FC<Props> = ({
    isOpen,
    onClose,
    points,
    selectedId,
    onSelect,
}) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (isOpen && !dialog.open) dialog.showModal();
        if (!isOpen && dialog.open) dialog.close();
    }, [isOpen]);

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}   // срабатывает и при закрытии по Esc
            onClick={(e) => {
                // клик по затемнённому фону
                if (e.target === dialogRef.current) onClose();
            }}
            className="m-0 h-full max-h-none w-full max-w-none p-0 bg-white md:m-auto md:h-auto md:max-h-[80vh] md:max-w-lg md:rounded-lg backdrop:bg-black/40"
        >
            <div className="flex h-full flex-col p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl">Пункт выдачи</h2>
                    <button type="button" onClick={onClose} aria-label="Закрыть">
                        ✕
                    </button>
                </div>

                <ul className="flex flex-col gap-3 overflow-y-auto">
                    {points.map((point) => {
                        const isSelected = point.id === selectedId;

                        return (
                            <li key={point.id}>
                                <button
                                    type="button"
                                    aria-pressed={isSelected}
                                    onClick={() => {
                                        onSelect(point.id);
                                        onClose();
                                    }}
                                    className={`w-full rounded-lg border p-4 text-left transition-colors ${
                                        isSelected
                                            ? "border-custom-secondary"
                                            : "border-custom-accent hover:border-custom-primary"
                                    }`}
                                >
                                    <div className="font-medium">{point.name}</div>
                                    <div className="mt-1 text-sm text-custom-dark-grey">
                                        {formatPickupAddress(point)}
                                    </div>
                                    <div className="mt-1 text-sm text-custom-grey">{point.workingHours}</div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </dialog>
    );
};