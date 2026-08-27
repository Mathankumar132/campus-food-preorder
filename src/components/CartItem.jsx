import QuantitySelector from "./QuantitySelector.jsx";

// A single row in the Cart page.
function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <span className="cart-item__emoji" aria-hidden="true"><img src={item.image} alt={item.name} /></span>

      <div className="cart-item__info">
        <h4 className="cart-item__name">{item.name}</h4>
        <p className="cart-item__price">₹{item.price} each</p>
      </div>

      <QuantitySelector
        quantity={item.quantity}
        onIncrease={() => onIncrease(item.id)}
        onDecrease={() => onDecrease(item.id)}
      />

      <p className="cart-item__subtotal">₹{item.price * item.quantity}</p>

      <button
        type="button"
        className="cart-item__remove"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        🗑️
      </button>
    </div>
  );
}

export default CartItem;
