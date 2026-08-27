import FoodCard from "./FoodCard.jsx";
import EmptyState from "./EmptyState.jsx";

// Renders a responsive grid of FoodCards using map().
// Shows a friendly empty state when filter()/search leaves nothing to show.
function FoodGrid({ foods, onAddToCart }) {
  if (foods.length === 0) {
    return (
      <EmptyState
        icon="🔎"
        title="No food items found."
        message="Try a different search term or clear your filters."
      />
    );
  }

  return (
    <div className="food-grid">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default FoodGrid;
