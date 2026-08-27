import OrderCard from "../components/OrderCard.jsx";
import EmptyState from "../components/EmptyState.jsx";

function Orders({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="page-narrow">
        <EmptyState
          icon="📋"
          title="You haven't placed any orders yet."
          message="Your pre-orders will show up here so you can track them."
          actionLabel="Browse Menu"
          actionTo="/menu"
        />
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
