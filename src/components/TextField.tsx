// src/components/TextField.tsx
import React, { useId, useState } from "react";

export interface TextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    name?: string;
    type?: React.HTMLInputTypeAttribute;
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
    autoComplete?: string;
    placeholder?: string;
    error?: string;
    success?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    className?: string;
}

const SuccessIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#169B00" />
        <path d="M7 12.5l3.2 3.2L17 8.8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const ErrorIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill="#E10000" />
        <path d="M12 6.5v7" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="12" cy="17.2" r="1.4" fill="white" />
    </svg>
);

export const TextField: React.FC<TextFieldProps> = ({
    label,
    value,
    onChange,
    onBlur,
    name,
    type = "text",
    inputMode,
    autoComplete,
    placeholder,
    error,
    success,
    inputRef,
    className = "",
}) => {
    const id = useId();
    const [focused, setFocused] = useState(false);

    const floated = focused || value !== "";
    const hasError = !!error;

    const borderClass = hasError
        ? "border-[#E10000]"
        : focused
            ? "border-black"
            : "border-custom-dark-grey";

    return (
        <div className={`w-full ${className}`}>
            <div className="relative">
                <input
                    id={id}
                    ref={inputRef}
                    name={name}
                    type={type}
                    inputMode={inputMode}
                    autoComplete={autoComplete}
                    value={value}
                    placeholder={floated ? placeholder : undefined}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => {
                        setFocused(false);
                        onBlur?.();
                    }}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${id}-error` : undefined}
                    className={`h-14 w-full rounded-lg border bg-transparent px-4 pr-12 pt-5 pb-1 outline-none transition-colors placeholder:text-custom-grey ${borderClass}`}
                />

                <label
                    htmlFor={id}
                    className={`pointer-events-none absolute left-4 transition-all duration-150 ${floated
                            ? "top-2 text-xs text-custom-dark-grey"
                            : "top-1/2 -translate-y-1/2 text-base text-custom-grey"
                        }`}
                >
                    {label}
                </label>

                {(hasError || success) && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2" aria-hidden="true">
                        {hasError ? <ErrorIcon /> : <SuccessIcon />}
                    </span>
                )}
            </div>

            {hasError && (
                <p id={`${id}-error`} className="mt-1 px-1 text-xs text-[#E10000]">
                    {error}
                </p>
            )}
        </div>
    );
};