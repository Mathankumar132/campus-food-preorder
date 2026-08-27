// Controlled search input. The parent owns the `value` state (useState)
// and re-filters the food list with filter() whenever it changes.
function SearchBar({ value, onChange, placeholder = "Search for food, e.g. Dosa..." }) {
  return (
    <div className="search-bar">
      <span className="search-bar__icon" aria-hidden="true">🔍</span>
      <label htmlFor="food-search" className="sr-only">
        Search food
      </label>
      <input
        id="food-search"
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-bar__clear"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
