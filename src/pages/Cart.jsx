import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import EmptyState from "../components/EmptyState.jsx";

function Cart({ cart, onIncrease, onDecrease, onRemove, subtotal, convenienceFee, total }) {
  if (cart.length === 0) {
    return (
      <div className="page-narrow">
        <EmptyState
          icon="🛒"
          title="Your cart is empty."
          message="Let's find something delicious!"
          actionLabel="Browse Menu"
          actionTo="/menu"
        />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      <div className="cart-page__layout">
        <div className="cart-page__items">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="cart-summary__row">
            <span>Convenience Fee</span>
            <span>₹{convenienceFee}</span>
          </div>
          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Link to="/checkout" className="btn btn--primary btn--full">
            Proceed to Checkout
          </Link>
          <Link to="/menu" className="btn btn--ghost btn--full">
            Add More Items
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
