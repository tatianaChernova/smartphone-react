export interface ProductAttributes {
  brand: string;
  ram: number;
  cores: number;
  storage: number;
  screenSize: number;
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
}