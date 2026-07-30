export interface ProductAttributes {
  brand: string;
  ram: number;
  cores: number;
  storage: number;
  screenSize: number;
  powerSupply?: number;
  mainCamera?: number;
}
export interface ProductColor {
  name: string;
  value: string;
}
export interface ProductItem {
  id: number;
  categoryId: number;
  name: string;
  images: string[];
  price: number;
  oldPrice?: number;
  inStock: boolean;
  attributes?: ProductAttributes;
  colors?: ProductColor[];
}