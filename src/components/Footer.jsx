import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__title">Campus Food Pre-Order</span>
          <p className="footer__tagline">Skip the queue. Order ahead. Eat on time.</p>
        </div>

        <nav className="footer__links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/orders">Orders</Link>
        </nav>
      </div>
      <p className="footer__copy">© 2026 Campus Food Pre-Order</p>
    </footer>
  );
}

export default Footer;
