import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";
import { Product, Category } from "../types/productTypes";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products and categories separately
    Promise.all([getProducts(), getCategories()])
      .then(([productRes, categoryRes]) => {
        setProducts(productRes);
        setCategories(categoryRes);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>

      <h2>Categories</h2>
      <ul>
        {categories.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
