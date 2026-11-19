// src/utils/formatPhone.ts
export function formatPhone(input: string): string {
    let digits = input.replace(/\D/g, "");

    // первая 7 или 8 это код страны, он уже есть в маске
    if (digits.startsWith("7") || digits.startsWith("8")) digits = digits.slice(1);
    digits = digits.slice(0, 10);

    if (!digits) return "";

    let result = `+7-(${digits.slice(0, 3)}`;
    if (digits.length > 3) result += `)-${digits.slice(3, 6)}`;
    if (digits.length > 6) result += `-${digits.slice(6, 8)}`;
    if (digits.length > 8) result += `-${digits.slice(8, 10)}`;

    return result;
}