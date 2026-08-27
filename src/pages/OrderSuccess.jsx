import { useLocation, Link } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";

function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="page-narrow">
        <EmptyState
          icon="🧾"
          title="No recent order found."
          message="Looks like you refreshed this page. Check your order history instead."
          actionLabel="View Orders"
          actionTo="/orders"
        />
      </div>
    );
  }

  return (
    <div className="order-success">
      <div className="order-success__icon" aria-hidden="true">✅</div>
      <h1>Order placed successfully!</h1>
      <p className="order-success__id">{order.id}</p>

      <div className="order-success__card">
        <div className="order-success__row">
          <span>Student</span>
          <span>{order.studentName}</span>
        </div>
        <div className="order-success__row">
          <span>Pickup Time</span>
          <span>{order.pickupTime}</span>
        </div>
        <div className="order-success__row">
          <span>Payment Method</span>
          <span>{order.paymentMethod}</span>
        </div>
        <div className="order-success__row">
          <span>Estimated Preparation</span>
          <span>15-20 min</span>
        </div>

        <hr />

        <ul className="checkout-summary__list">
          {order.items.map((item) => (
            <li key={item.id}>
              <span>{item.name} × {item.quantity}</span>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="cart-summary__row cart-summary__row--total">
          <span>Total Paid</span>
          <span>₹{order.total}</span>
        </div>
      </div>

      <div className="order-success__actions">
        <Link to={`/orders/${order.id}`} className="btn btn--primary">Track Order</Link>
        <Link to="/menu" className="btn btn--ghost">Order More Food</Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
