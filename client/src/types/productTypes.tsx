// types.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface ApiResponse {
  products: Product[];
  categories: Category[];
}
