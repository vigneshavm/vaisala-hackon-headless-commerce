import { Category } from "../types/productTypes";

export async function getCategories(): Promise<Category[]> {
  const res = await fetch("http://localhost:5000/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}