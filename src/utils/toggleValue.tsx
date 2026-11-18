// src/utils/toggleValue.ts
export function toggleValue<T>(list: T[], value: T): T[] {
    return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}