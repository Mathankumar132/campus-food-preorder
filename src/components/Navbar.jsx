import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

// Reusable navigation bar shown on every page.
// `cartCount` comes from props so it always reflects the latest cart state.
function Navbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__logo" aria-hidden="true">🍛</span>
          <span className="navbar__title">Campus Food Pre-Order</span>
        </Link>

        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          <NavLink to="/" end onClick={closeMenu} className="navbar__link">
            Home
          </NavLink>
          <NavLink to="/menu" onClick={closeMenu} className="navbar__link">
            Menu
          </NavLink>
          <NavLink to="/orders" onClick={closeMenu} className="navbar__link">
            Orders
          </NavLink>
          <NavLink to="/cart" onClick={closeMenu} className="navbar__link navbar__link--cart">
            Cart
            <span className="navbar__cart-count">{cartCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
