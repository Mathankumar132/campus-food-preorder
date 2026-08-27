import { Link } from "react-router-dom";

// Displays a single food item. Used inside FoodGrid via map().
function FoodCard({ food, onAddToCart }) {
  const { id, name, category, description, price, image, vegetarian, rating, preparationTime, available } = food;

  return (
    <div className="food-card">
      <div className="food-card__media">
        <img className="food-card__image" src={image} alt={name} loading="lazy" />
        <span className={`veg-dot ${vegetarian ? "veg-dot--veg" : "veg-dot--nonveg"}`} title={vegetarian ? "Vegetarian" : "Non-vegetarian"} />
        {!available && <span className="food-card__badge">Currently unavailable</span>}
      </div>

      <div className="food-card__body">
        <div className="food-card__top">
          <h3 className="food-card__name">{name}</h3>
          <span className="food-card__rating">★ {rating}</span>
        </div>
        <p className="food-card__category">{category} · {preparationTime}</p>
        <p className="food-card__desc">{description}</p>

        <div className="food-card__footer">
          <span className="food-card__price">₹{price}</span>
          <div className="food-card__actions">
            <Link to={`/food/${id}`} className="btn btn--ghost btn--sm">
              View Details
            </Link>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              disabled={!available}
              onClick={() => onAddToCart(food)}
            >
              {available ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
