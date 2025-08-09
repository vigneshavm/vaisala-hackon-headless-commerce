import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import { getCategories } from "../api/categoryApi";

// // Bootstrap
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// === Type definitions (moved into this file) ===
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
  categoryId?: number;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productRes, categoryRes]) => {
        setProducts(productRes);
        setCategories(categoryRes);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Our Products</h2>

      {/* Product Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={product.image || "https://via.placeholder.com/300"}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">
                  {product.description || "No description available."}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0">${product.price}</span>
                  <button className="btn btn-outline-primary">
                    <i className="bi bi-cart-plus"></i> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories Section */}
      {categories.length > 0 && (
        <>
          <h2 className="text-center my-4">Categories</h2>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {categories.map((category) => (
              <span className="badge bg-secondary p-2" key={category.id}>
                {category.name}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
