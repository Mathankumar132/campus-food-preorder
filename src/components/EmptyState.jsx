import { Link } from "react-router-dom";

// Reusable empty/error state: shown for an empty cart, no search results,
// an invalid food id, or an empty orders list.
function EmptyState({ icon = "🍽️", title, message, actionLabel, actionTo }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon" aria-hidden="true">{icon}</div>
      <h3 className="empty-state__title">{title}</h3>
      {message && <p className="empty-state__message">{message}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn--primary">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
