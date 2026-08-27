const CATEGORIES = ["All", "Breakfast", "Lunch", "Snacks", "Beverages"];

// Category pills + veg-only / available-only toggles.
// Purely controlled by props so Menu.jsx stays the single source of truth.
function CategoryFilter({
  selectedCategory,
  onSelectCategory,
  vegOnly,
  onToggleVeg,
  availableOnly,
  onToggleAvailable,
}) {
  return (
    <div className="category-filter">
      <div className="category-filter__pills">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`pill ${selectedCategory === category ? "pill--active" : ""}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="category-filter__toggles">
        <label className="toggle">
          <input type="checkbox" checked={vegOnly} onChange={onToggleVeg} />
          <span>Vegetarian only</span>
        </label>
        <label className="toggle">
          <input type="checkbox" checked={availableOnly} onChange={onToggleAvailable} />
          <span>Available only</span>
        </label>
      </div>
    </div>
  );
}

export { CATEGORIES };
export default CategoryFilter;
