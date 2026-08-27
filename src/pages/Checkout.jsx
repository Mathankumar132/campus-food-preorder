import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";

const PICKUP_TIMES = ["12:30 PM", "12:45 PM", "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM"];

const INITIAL_FORM = {
  studentName: "",
  rollNumber: "",
  phone: "",
  pickupTime: "",
  instructions: "",
  paymentMethod: "",
};

function Checkout({ cart, total, placeOrder }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div className="page-narrow">
        <EmptyState
          icon="🛒"
          title="Your cart is empty."
          message="Add a few items before checking out."
          actionLabel="Browse Menu"
          actionTo="/menu"
        />
      </div>
    );
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.studentName.trim()) {
      newErrors.studentName = "Student name is required.";
    } else if (form.studentName.trim().length < 3) {
      newErrors.studentName = "Name must be at least 3 characters.";
    }

    if (!form.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!form.pickupTime) {
      newErrors.pickupTime = "Please select a pickup time.";
    }

    if (!form.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newOrder = placeOrder(form);
    navigate("/order-success", { state: { order: newOrder } });
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-page__layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="studentName">Student Name</label>
            <input
              id="studentName"
              type="text"
              value={form.studentName}
              onChange={handleChange("studentName")}
              aria-invalid={!!errors.studentName}
            />
            {errors.studentName && <span className="form-error">{errors.studentName}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="rollNumber">Roll Number</label>
            <input
              id="rollNumber"
              type="text"
              value={form.rollNumber}
              onChange={handleChange("rollNumber")}
              aria-invalid={!!errors.rollNumber}
            />
            {errors.rollNumber && <span className="form-error">{errors.rollNumber}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="10-digit mobile number"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="pickupTime">Pickup Time</label>
            <select
              id="pickupTime"
              value={form.pickupTime}
              onChange={handleChange("pickupTime")}
              aria-invalid={!!errors.pickupTime}
            >
              <option value="">Select a pickup time</option>
              {PICKUP_TIMES.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.pickupTime && <span className="form-error">{errors.pickupTime}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="instructions">Special Instructions (optional)</label>
            <textarea
              id="instructions"
              rows="3"
              value={form.instructions}
              onChange={handleChange("instructions")}
              placeholder="E.g. less spicy, no onions..."
            />
          </div>

          <fieldset className="form-field">
            <legend>Payment Method</legend>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Pay at Canteen"
                  checked={form.paymentMethod === "Pay at Canteen"}
                  onChange={handleChange("paymentMethod")}
                />
                Pay at Canteen
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={form.paymentMethod === "UPI"}
                  onChange={handleChange("paymentMethod")}
                />
                UPI (demo only)
              </label>
            </div>
            {errors.paymentMethod && <span className="form-error">{errors.paymentMethod}</span>}
          </fieldset>

          <button type="submit" className="btn btn--primary btn--full">
            Place Order · ₹{total}
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <ul className="checkout-summary__list">
            {cart.map((item) => (
              <li key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
