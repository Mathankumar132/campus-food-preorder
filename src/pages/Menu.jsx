import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import foodData from "../data/foodData.js";
import SearchBar from "../components/SearchBar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import FoodGrid from "../components/FoodGrid.jsx";

function Menu({ onAddToCart }) {
  const [searchParams] = useSearchParams();

  // Pre-fill from a Home page link like /menu?search=Dosa or /menu?category=Lunch
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [vegOnly, setVegOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);

  // Recompute the visible list whenever any filter changes, using filter().
  const filteredFoods = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return foodData.filter((food) => {
      const matchesSearch =
        term === "" ||
        food.name.toLowerCase().includes(term) ||
        food.category.toLowerCase().includes(term) ||
        food.description.toLowerCase().includes(term);

      const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
      const matchesVeg = !vegOnly || food.vegetarian;
      const matchesAvailability = !availableOnly || food.available;

      return matchesSearch && matchesCategory && matchesVeg && matchesAvailability;
    });
  }, [searchTerm, selectedCategory, vegOnly, availableOnly]);

  return (
    <div className="menu-page">
      <div className="menu-page__header">
        <h1>Today's Menu</h1>
        <p>{filteredFoods.length} item{filteredFoods.length !== 1 ? "s" : ""} available</p>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        vegOnly={vegOnly}
        onToggleVeg={() => setVegOnly((v) => !v)}
        availableOnly={availableOnly}
        onToggleAvailable={() => setAvailableOnly((v) => !v)}
      />

      <FoodGrid foods={filteredFoods} onAddToCart={onAddToCart} />
    </div>
  );
}

export default Menu;
