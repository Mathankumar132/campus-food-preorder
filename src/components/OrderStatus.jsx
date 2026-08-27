const STEPS = ["Order Placed", "Preparing", "Ready for Pickup", "Completed"];

// Visual status tracker: Order Placed -> Preparing -> Ready for Pickup -> Completed.
// `compact` renders a smaller inline version for use on OrderCard.
function OrderStatus({ status, compact = false }) {
  const currentIndex = STEPS.indexOf(status);

  return (
    <div className={`order-status ${compact ? "order-status--compact" : ""}`}>
      {STEPS.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <div
            key={step}
            className={`order-status__step ${isComplete ? "is-complete" : ""} ${isCurrent ? "is-current" : ""}`}
          >
            <span className="order-status__dot">{isComplete ? "✓" : index + 1}</span>
            <span className="order-status__label">{step}</span>
            {index < STEPS.length - 1 && <span className="order-status__connector" />}
          </div>
        );
      })}
    </div>
  );
}

export { STEPS };
export default OrderStatus;
