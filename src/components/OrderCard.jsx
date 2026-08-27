import { Link } from "react-router-dom";
import OrderStatus from "./OrderStatus.jsx";

// Summary card for a single order, shown on the Orders page.
function OrderCard({ order }) {
  const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Link to={`/orders/${order.id}`} className="order-card">
      <div className="order-card__top">
        <div>
          <p className="order-card__id">{order.id}</p>
          <p className="order-card__date">{order.date}</p>
        </div>
        <p className="order-card__total">₹{order.total}</p>
      </div>

      <p className="order-card__meta">
        {itemCount} item{itemCount !== 1 ? "s" : ""} · Pickup at {order.pickupTime}
      </p>

      <OrderStatus status={order.status} compact />
    </Link>
  );
}

export default OrderCard;
