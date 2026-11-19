// src/schemas/contactsSchema.ts
import { z } from "zod";

export const contactsSchema = z.object({
    name: z.string().trim().min(2, "Введите имя (минимум 2 символа)"),
    phone: z
        .string()
        .refine((value) => value.replace(/\D/g, "").length === 11, "Введите номер телефона полностью"),
    email: z.string().trim().min(1, "Введите email").email("Введите корректный email"),
});

export type ContactsFormValues = z.infer<typeof contactsSchema>;