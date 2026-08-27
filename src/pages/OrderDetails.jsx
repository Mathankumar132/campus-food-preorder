import { useParams, Link } from "react-router-dom";
import OrderStatus from "../components/OrderStatus.jsx";
import EmptyState from "../components/EmptyState.jsx";

function OrderDetails({ orders }) {
  const { id } = useParams();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="page-narrow">
        <EmptyState
          icon="🚫"
          title="Order not found."
          message="We couldn't find an order with this ID."
          actionLabel="Back to Orders"
          actionTo="/orders"
        />
      </div>
    );
  }

  return (
    <div className="order-details">
      <Link to="/orders" className="back-link">← Back to Orders</Link>

      <div className="order-details__header">
        <div>
          <h1>{order.id}</h1>
          <p>{order.date} · Pickup at {order.pickupTime}</p>
        </div>
        <span className="order-details__status-badge">{order.status}</span>
      </div>

      <div className="order-details__tracker">
        <OrderStatus status={order.status} />
      </div>

      <div className="order-details__grid">
        <div className="order-details__card">
          <h2>Items</h2>
          <ul className="checkout-summary__list">
            {order.items.map((item) => (
              <li key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="cart-summary__row">
            <span>Convenience Fee</span>
            <span>₹{order.convenienceFee}</span>
          </div>
          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>

        <div className="order-details__card">
          <h2>Student Details</h2>
          <div className="order-success__row">
            <span>Name</span>
            <span>{order.studentName}</span>
          </div>
          <div className="order-success__row">
            <span>Roll Number</span>
            <span>{order.rollNumber}</span>
          </div>
          <div className="order-success__row">
            <span>Phone</span>
            <span>{order.phone}</span>
          </div>
          <div className="order-success__row">
            <span>Payment Method</span>
            <span>{order.paymentMethod}</span>
          </div>
          {order.instructions && (
            <div className="order-success__row">
              <span>Instructions</span>
              <span>{order.instructions}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
