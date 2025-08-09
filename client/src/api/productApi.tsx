import { ApiResponse } from "../types/productTypes";
export const getProducts = async (): Promise<ApiResponse> => {
  const res = await fetch("http://localhost:5000/api/products"); // ✅ Backend API
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json();
};
