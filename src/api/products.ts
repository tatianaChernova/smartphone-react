import type { ProductItem } from "../types/product";
import products from "../data/products.json";

export const getProducts = async (): Promise<ProductItem[]> => {
  return products;
};

// const API_URL = "https://api.jsonbin.io/v3/b/6a213164da38895dfe852c83";

// const API_KEY = "$2a$10$UsYad.S7LsdDjDErHh.jaOEOxE2RSH0IzilPcdjliKoBbLdEyhy42";

// export const getProducts = async (): Promise<ProductItem[]> => {
//   const res = await fetch(`${API_URL}/latest`, {
//     headers: {
//       "X-Master-Key": API_KEY,
//     },
//   });

//   if (!res.ok) {
//     throw new Error("Ошибка при загрузке товаров");
//   }

//   const data = await res.json();

//   return data.record.products;
// };