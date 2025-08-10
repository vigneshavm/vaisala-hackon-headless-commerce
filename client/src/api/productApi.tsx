import { Product } from "../types/productTypes";
import { API_URL } from "../config";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
