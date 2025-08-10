// types.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image: string;
}

export interface RawProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
  images: string[];
}


export interface Category {
  id: number;
  name: string;
}

export interface ApiResponse {
  products: Product[];
  categories: Category[];
}
