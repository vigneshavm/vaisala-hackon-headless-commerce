import React, { useEffect, useState } from "react";
import { getCategories } from "../api/categoryApi";
import { getProducts } from "../api/productApi";
import { useNavigate } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

interface Product {
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
  price: number;
  category: {
    _id: string;
    name: string;
  };
  images: string[];
  // other fields from API if needed
}

interface CartItem extends Product {
  quantity: number;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    description: "Latest iPhone model",
    price: 99999,
    categoryId: 1,
    image: "https://images.unsplash.com/photo-1720048171731-15b3d9d5473f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MXwxfHNlYXJjaHwxfHxzbWFydHBob25lfGVufDB8MHx8fDE3MjEzMDU4NTZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    description: "Flagship Android phone",
    price: 84999,
    categoryId: 1,
    image: "https://images.unsplash.com/photo-1598618826732-fb2fdf367775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxzbWFydHBob25lfGVufDB8MHx8fDE3MjEzMDU4NTZ8MA&ixlib=rb-4.0.3&q=80&w=1080"
  },
  {
    id: 3,
    name: "MacBook Air M2",
    description: "Lightweight & powerful",
    price: 12499,
    categoryId: 2,
    image: "https://images.unsplash.com/photo-1600087626120-062700394a01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxzbWFydHBob25lfGVufDB8MHx8fDE3MjEzMDU4NTZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    description: "Noise cancelling headphones",
    price: 29999,
    categoryId: 3,
    image: "https://images.unsplash.com/photo-1598965402089-897ce52e8355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxzbWFydHBob25lfGVufDB8MHx8fDE3MjEzMDU4NTZ8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];


export default function FlipkartClone() {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [categories, selectedCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const categoryIdMap = new Map<string, number>();
    let nextCategoryId = 1;
  
    getCategories()
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Categories API returned invalid data:", data);
          return;
        }
        const categoriesData: Category[] = data.map((cat, index) => ({
          id: index + 1,
          name: cat.name,
        }));

        selectedCategories(categoriesData); // update state with categories
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  
    getProducts()
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Products API returned invalid data:", data);
          return;
        }
        const products = data.map((p, index) => {
          if (!categoryIdMap.has(p.category._id)) {
            categoryIdMap.set(p.category._id, nextCategoryId++);
          }
          return {
            id: index + 1,
            name: p.name,
            description: p.description,
            price: p.price,
            categoryId: categoryIdMap.get(p.category._id)!,
            image: p.images && p.images.length > 0 ? p.images[0] : "",
          };
        });
        setProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Filter products by category & search term
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === null || product.categoryId === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === productId);
      if (!existing) return prevCart;

      if (existing.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const handleLogout = () => {
    navigate("/"); // redirect to home page
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setCheckoutSuccess(true);
    setCart([]);
  };

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Ecommerce Products
          </a>
          <div className="d-flex align-items-center">
            <span className="me-3">Hello, User</span>
            <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="row">
        {/* Categories Sidebar */}
        <aside className="col-12 col-md-4 col-lg-3 mb-4">
          <div className="border rounded p-3 h-100 d-flex flex-column">
            <h5 className="mb-3">Categories</h5>
            <ul className="list-group mb-4 flex-grow-1 overflow-auto" style={{ maxHeight: "300px" }}>
              <li
                className={`list-group-item pointer ${selectedCategory === null ? "active" : ""}`}
                onClick={() => setSelectedCategory(null)}
                style={{ cursor: "pointer" }}
              >
                All
              </li>
              {categories.map((cat: any) => (
                <li
                  key={cat.id}
                  className={`list-group-item pointer ${selectedCategory === cat.id ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{ cursor: "pointer" }}
                >
                  {cat.name}
                </li>
              ))}
            </ul>

            {/* Cart */}
            <h5>Cart ({cart.reduce((acc: any, item: any) => acc + item.quantity, 0)} items)</h5>
            <ul className="list-group mb-3 flex-grow-1 overflow-auto" style={{ maxHeight: "250px" }}>
              {cart.length === 0 && <li className="list-group-item text-muted">Cart is empty</li>}
              {cart.map((item: any) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    {item.name} <br />
                    <small>₹{item.price} × {item.quantity}</small>
                  </div>
                  <div>
                    <button
                      className="btn btn-sm btn-danger me-1"
                      onClick={() => removeFromCart(item.id)}
                    >
                      −
                    </button>
                    <button className="btn btn-sm btn-success" onClick={() => addToCart(item)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total & Checkout */}
            <div>
              <h5>Total: ₹{totalAmount.toLocaleString()}</h5>
              <button
                className="btn btn-primary w-100"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        </aside>

        {/* Products List */}
        <section className="col-12 col-md-8 col-lg-9">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="row g-4">
            {filteredProducts.length === 0 ? (
              <div className="col-12 text-center text-muted mt-5">No products found</div>
            ) : (
              filteredProducts.map((product: any) => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text flex-grow-1">{product.description}</p>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="h5 mb-0">₹{product.price.toLocaleString()}</span>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => addToCart(product)}
                        >
                          <i className="bi bi-cart-plus"></i> Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Checkout Success Modal */}
      {checkoutSuccess && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="checkoutSuccessTitle"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="checkoutSuccessTitle">
                  Checkout Successful
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setCheckoutSuccess(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Thank you for your purchase!</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => setCheckoutSuccess(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </div>
      )}
    </div>
  );
}


