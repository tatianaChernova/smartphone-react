// src/components/checkout/FormTextField.tsx
import { useController } from "react-hook-form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { TextField } from "../TextField";
import type { TextFieldProps } from "../TextField";

type PassThroughProps = Omit<
    TextFieldProps,
    "value" | "onChange" | "onBlur" | "name" | "error" | "success" | "inputRef"
>;

interface Props<T extends FieldValues> extends PassThroughProps {
    control: Control<T>;
    name: FieldPath<T>;
    format?: (value: string) => string;
}

export function FormTextField<T extends FieldValues>({
    control,
    name,
    format,
    ...rest
}: Props<T>) {
    const { field, fieldState, formState } = useController({ control, name });

    const value = String(field.value ?? "");

    // ошибку показываем, когда пользователь ушёл из поля или нажал «Оплатить»
    const showError = (fieldState.isTouched || formState.isSubmitted) && !!fieldState.error;
    // галочка появляется сразу, как только введённое значение стало корректным
    const success = !fieldState.error && fieldState.isDirty && value !== "";

    return (
        <TextField
            {...rest}
            name={field.name}
            value={value}
            onChange={(next) => field.onChange(format ? format(next) : next)}
            onBlur={field.onBlur}
            inputRef={field.ref}
            error={showError ? fieldState.error?.message : undefined}
            success={success}
        />
    );
}