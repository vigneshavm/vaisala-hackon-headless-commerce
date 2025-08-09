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
      <h2 className="mb-3">Ecommerce</h2>
      <div className="row">
        {/* Categories Sidebar */}
        <div className="col-md-3">
          <h5>Categories</h5>
          <ul className="list-group mb-3">
            <li
              className={`list-group-item ${selectedCategory === null ? "active" : ""
                }`}
              onClick={() => setSelectedCategory(null)}
              style={{ cursor: "pointer" }}
            >
              All
            </li>
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={`list-group-item ${selectedCategory === cat.id ? "active" : ""
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

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {filteredProducts.length === 0 && (
              <div className="col-12 text-center text-muted mt-5">
                No products found
              </div>
            )}

            {filteredProducts.map((product) => (
              <div className="col" key={product.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
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


     