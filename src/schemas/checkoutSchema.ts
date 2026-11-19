// src/schemas/checkoutSchema.ts
import { z } from "zod";
import { contactsSchema } from "./contactsSchema";

export const PAYMENT_METHODS = ["saved-card", "sbp", "new-card"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export const checkoutSchema = contactsSchema.extend({
    paymentMethod: z.enum(PAYMENT_METHODS),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;