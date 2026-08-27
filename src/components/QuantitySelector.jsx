// Small reusable +/- quantity control used on the Food Details and Cart pages.
function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1 }) {
  return (
    <div className="qty-selector">
      <button
        type="button"
        className="qty-selector__btn"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="qty-selector__value" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className="qty-selector__btn"
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
