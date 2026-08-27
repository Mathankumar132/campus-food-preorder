import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";

import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import FoodDetails from "./pages/FoodDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Orders from "./pages/Orders.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";

const CART_KEY = "campusFoodCart";
const ORDERS_KEY = "campusFoodOrders";
const CONVENIENCE_FEE = 5;

function App() {
  // ---- Cart state ----
  const [cart, setCart] = useState([]);
  // ---- Orders state ----
  const [orders, setOrders] = useState([]);
  // ---- Toast feedback state ----
  const [toast, setToast] = useState(null); // { message, type }

  // Load cart + orders from localStorage once, when the app starts.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem(ORDERS_KEY);
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch (err) {
      console.error("Failed to load saved data:", err);
    }
  }, []);

  // Persist cart to localStorage whenever it changes.
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  // Persist orders to localStorage whenever they change.
  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
  }, []);

  // ---- Cart actions ----
  const addToCart = useCallback(
    (food, quantity = 1) => {
      setCart((prevCart) => {
        const existing = prevCart.find((item) => item.id === food.id);
        if (existing) {
          return prevCart.map((item) =>
            item.id === food.id ? { ...item, quantity: item.quantity + quantity } : item
          );
        }
        return [...prevCart, { ...food, quantity }];
      });
      showToast(`${food.name} added to cart!`);
    },
    [showToast]
  );

  const increaseQty = useCallback((id) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  }, []);

  const decreaseQty = useCallback((id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    );
  }, []);

  const removeFromCart = useCallback(
    (id) => {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      showToast("Item removed from cart.", "info");
    },
    [showToast]
  );

  const clearCart = useCallback(() => setCart([]), []);

  // Cart calculations using reduce().
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = cart.length > 0 ? subtotal + CONVENIENCE_FEE : 0;
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // ---- Order actions ----
  const placeOrder = useCallback(
    (studentInfo) => {
      const now = new Date();
      const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
      const orderId = `ORD-${datePart}-${Math.floor(1000 + Math.random() * 9000)}`;

      const newOrder = {
        id: orderId,
        date: now.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        items: cart,
        subtotal,
        convenienceFee: CONVENIENCE_FEE,
        total,
        status: "Order Placed",
        ...studentInfo, // studentName, rollNumber, phone, pickupTime, instructions, paymentMethod
      };

      setOrders((prevOrders) => [newOrder, ...prevOrders]);
      clearCart();
      showToast("Your order has been placed successfully!");
      return newOrder;
    },
    [cart, subtotal, total, clearCart, showToast]
  );

  // Find the order that is currently in progress (not yet Completed) for the Home page.
  const activeOrder = orders.find((order) => order.status !== "Completed");

  return (
    <div className="app-shell">
      <Navbar cartCount={cartCount} />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home activeOrder={activeOrder} onAddToCart={addToCart} />} />
          <Route path="/menu" element={<Menu onAddToCart={addToCart} />} />
          <Route path="/food/:id" element={<FoodDetails onAddToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                onRemove={removeFromCart}
                subtotal={subtotal}
                convenienceFee={CONVENIENCE_FEE}
                total={total}
              />
            }
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} total={total} placeOrder={placeOrder} />}
          />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders orders={orders} />} />
          <Route path="/orders/:id" element={<OrderDetails orders={orders} />} />
        </Routes>
      </main>

      <Footer />

      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </div>
  );
}

export default App;
