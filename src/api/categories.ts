import type { CategoryItem } from "../types/category";

const API_URL = "https://api.jsonbin.io/v3/b/6a213164da38895dfe852c83";

const API_KEY = "$2a$10$UsYad.S7LsdDjDErHh.jaOEOxE2RSH0IzilPcdjliKoBbLdEyhy42";

export const getCategories = async (): Promise<CategoryItem[]> => {
  const res = await fetch(`${API_URL}/latest`, {
    headers: {
      "X-Master-Key": API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка при загрузке категорий");
  }

  const data = await res.json();

  return data.record.categories;
};