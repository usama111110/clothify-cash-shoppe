
import { Link } from "react-router-dom";

const categories = [
  { id: "t-shirts", name: "T-Shirts", icon: "👕" },
  { id: "pants", name: "Pants", icon: "👖" },
  { id: "dresses", name: "Dresses", icon: "👗" },
  { id: "hoodies", name: "Hoodies", icon: "🧥" },
  { id: "jackets", name: "Jackets", icon: "🧥" },
  { id: "shoes", name: "Shoes", icon: "👟" },
  { id: "accessories", name: "Accessories", icon: "👜" },
];

const CategorySelector = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
          <Link 
            to={`/category/${category.id}`}
            key={category.id}
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-shop-secondary hover:bg-gray-100 transition-colors"
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            <span className="text-sm font-medium text-shop-primary">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
