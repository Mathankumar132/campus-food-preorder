import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import foodData from "../data/foodData.js";
import QuantitySelector from "../components/QuantitySelector.jsx";
import EmptyState from "../components/EmptyState.jsx";

function FoodDetails({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // find() locates the single food item that matches the URL param.
  const food = foodData.find((item) => item.id === Number(id));

  if (!food) {
    return (
      <div className="page-narrow">
        <EmptyState
          icon="🚫"
          title="Food item not found."
          message="The item you're looking for doesn't exist or may have been removed."
          actionLabel="Back to Menu"
          actionTo="/menu"
        />
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(food, quantity);
    navigate("/menu");
  };

  return (
    <div className="food-details">
      <Link to="/menu" className="back-link">← Back to Menu</Link>

      <div className="food-details__card">
        <div className="food-details__media">
          <img className="food-details__image" src={food.image} alt={food.name} />
          {!food.available && <span className="food-card__badge">Currently unavailable</span>}
        </div>

        <div className="food-details__info">
          <p className="food-details__category">{food.category}</p>
          <h1>{food.name}</h1>
          <p className="food-details__desc">{food.description}</p>

          <div className="food-details__stats">
            <div>
              <span className="stat-label">Price</span>
              <span className="stat-value">₹{food.price}</span>
            </div>
            <div>
              <span className="stat-label">Rating</span>
              <span className="stat-value">★ {food.rating}</span>
            </div>
            <div>
              <span className="stat-label">Prep Time</span>
              <span className="stat-value">{food.preparationTime}</span>
            </div>
            <div>
              <span className="stat-label">Type</span>
              <span className="stat-value">
                <span className={`veg-dot ${food.vegetarian ? "veg-dot--veg" : "veg-dot--nonveg"}`} />
                {food.vegetarian ? "Veg" : "Non-Veg"}
              </span>
            </div>
          </div>

          <div className="food-details__actions">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => q + 1)}
              onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
            />
            <button
              type="button"
              className="btn btn--primary"
              disabled={!food.available}
              onClick={handleAddToCart}
            >
              {food.available ? `Add to Cart · ₹${food.price * quantity}` : "Currently unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodDetails;
