import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

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

interface CartItem extends Product {
  quantity: number;
}

const categoriesData: Category[] = [
  { id: 1, name: "Mobiles" },
  { id: 2, name: "Laptops" },
  { id: 3, name: "Headphones" },
];

const productsData: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    description: "Latest iPhone model",
    price: 99999,
    categoryId: 1,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    description: "Flagship Android phone",
    price: 84999,
    categoryId: 1,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "MacBook Air M2",
    description: "Lightweight & powerful",
    price: 124999,
    categoryId: 2,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Sony WH-1000XM5",
    description: "Noise cancelling headphones",
    price: 29999,
    categoryId: 3,
    image: "https://via.placeholder.com/150",
  },
];

export default function FlipkartClone() {
  const [products] = useState<Product[]>(productsData);
  const [categories] = useState<Category[]>(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

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
      <h2 className="mb-3">Flipkart Clone</h2>
      <div className="row">
        {/* Categories Sidebar */}
        <div className="col-md-3">
          <h5>Categories</h5>
          <ul className="list-group mb-3">
            <li
              className={`list-group-item ${
                selectedCategory === null ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(null)}
              style={{ cursor: "pointer" }}
            >
              All
            </li>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`list-group-item ${
                  selectedCategory === cat.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat.id)}
                style={{ cursor: "pointer" }}
              >
                {cat.name}
              </li>
            ))}
          </ul>

          {/* Cart */}
          <h5>
            Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)
          </h5>
          <ul className="list-group mb-3">
            {cart.length === 0 && (
              <li className="list-group-item text-muted">Cart is empty</li>
            )}
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  {item.name} <br />
                  <small>
                    ₹{item.price} × {item.quantity}
                  </small>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-danger me-1"
                    onClick={() => removeFromCart(item.id)}
                  >
                    −
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => addToCart(item)}
                  >
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

        {/* Products Grid */}
        <div className="col-md-9">
          {/* Search Input */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="row">
            {filteredProducts.length === 0 && (
              <div className="col-12 text-center text-muted mt-5">
                No products found
              </div>
            )}

            {filteredProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <h6>₹{product.price.toLocaleString()}</h6>
                    <button
                      className="btn btn-primary mt-auto"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
