import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

function ProductList() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch products + categories together
  useEffect(() => {
    const fetchData = async () => {
  setLoading(false);
             setProducts([
  {
    id: 1,
    name: "Smartphone",
    description: "Latest model with AI camera",
    price: 699,
    image: "/images/smartphone.jpg",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Denim Jacket",
    description: "Stylish and comfortable",
    price: 89,
    image: "/images/jacket.jpg",
    category: "Clothing"
  }
]);

setCategories([
  "Electronics",
  "Clothing",
  "Books"
]);





    //   setLoading(true);
    //   try {
    //     let url = "/api/products";
    //     if (selectedCategory) {
    //       url += `?category=${encodeURIComponent(selectedCategory)}`;
    //     }
    //     const res = await fetch(url);
    //     if (!res.ok) throw new Error(`Error: ${res.status}`);
    //     const data = await res.json();
    //     setProducts(data.products);
    //     setCategories(data.categories);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    };
    fetchData();
  }, [selectedCategory]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Product List</h1>

      {/* Category Filter */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="category">Filter by Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                borderRadius: "8px",
                width: "200px"
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                <strong>${product.price}</strong>
              </p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
