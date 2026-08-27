import { useEffect } from "react";

// A small, self-dismissing feedback message.
// Controlled entirely by the parent: pass `message` (or null to hide it).
function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 2600);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toast toast--${type}`} role="status" aria-live="polite">
      <span>{message}</span>
    </div>
  );
}

export default Toast;
