
export const getDiscountPercent = (price: number, oldPrice?: number): number | null => {
    if (!oldPrice || oldPrice <= price) return null;
    const discount = ((oldPrice - price) / oldPrice) * 100;
    return Math.round(discount);
};
