import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { ApiResponse } from "../types/productTypes";

export default function ProductList() {
  const [data, setData] = useState<ApiResponse>({
    products: [],
    categories: [],
  });

   

  useEffect(() => {
    getProducts()
      .then((res:any) => {
        setData(res); 
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {data.products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price}
          </li>
        ))}
      </ul>

      <h2>Categories</h2>
      <ul>
        {data.categories.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
