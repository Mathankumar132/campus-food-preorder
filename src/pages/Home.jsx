import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import foodData from "../data/foodData.js";
import { CATEGORIES } from "../components/CategoryFilter.jsx";
import FoodCard from "../components/FoodCard.jsx";
import OrderStatus from "../components/OrderStatus.jsx";

const CATEGORY_ICON = {
  Breakfast: "🍳",
  Lunch: "🍛",
  Snacks: "🥪",
  Beverages: "☕",
};

// Landing / dashboard page. Shows a search bar, categories, popular items,
// and the current active order (if the student has one in progress).
function Home({ activeOrder, onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const popularItems = foodData
    .filter((food) => food.available && food.rating >= 4.4)
    .slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/menu?search=${encodeURIComponent(query)}` : "/menu");
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__content">
          <span className="hero__eyebrow">Campus Food Pre-Order</span>
          <h1 className="hero__title">Skip the queue. Order ahead. Eat on time.</h1>
          <p className="hero__subtitle">
            Browse today's canteen menu, pre-order your favourites, and walk straight up to
            pickup — no waiting in line between classes.
          </p>

          <form className="hero__search" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search for Dosa, Sandwich, Coffee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search food"
            />
            <button type="submit" className="btn btn--primary">Search</button>
          </form>

          <Link to="/menu" className="btn btn--secondary hero__cta">
            Browse Full Menu
          </Link>
        </div>
      </section>

      {activeOrder && (
        <section className="section">
          <div className="active-order-banner">
            <div>
              <p className="active-order-banner__eyebrow">Your order is on the way</p>
              <h3>{activeOrder.id} · Pickup at {activeOrder.pickupTime}</h3>
            </div>
            <OrderStatus status={activeOrder.status} compact />
            <Link to={`/orders/${activeOrder.id}`} className="btn btn--ghost btn--sm">
              Track Order
            </Link>
          </div>
        </section>
      )}

      <section className="section">
        <h2 className="section__title">Categories</h2>
        <div className="category-grid">
          {CATEGORIES.filter((c) => c !== "All").map((category) => (
            <Link key={category} to={`/menu?category=${category}`} className="category-tile">
              <span className="category-tile__icon" aria-hidden="true">
                {CATEGORY_ICON[category]}
              </span>
              <span>{category}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Popular Right Now</h2>
          <Link to="/menu" className="section__link">View full menu →</Link>
        </div>
        <div className="food-grid">
          {popularItems.map((food) => (
            <FoodCard key={food.id} food={food} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
