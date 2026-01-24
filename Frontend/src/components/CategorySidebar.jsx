import React from 'react';
import { 
  Shirt, 
  Watch, 
  Palette, 
  Sparkles, 
  Book, 
  Monitor, 
  Smartphone, 
  Armchair, 
  Diamond, 
  Utensils, 
  LayoutGrid 
} from 'lucide-react';

const CategorySidebar = ({ categories, selectedCategory, onSelectCategory }) => {
  
  const getIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    
    if (name.includes('apparel') || name.includes('cloth')) return <Shirt size={20} />;
    if (name.includes('accessor') || name.includes('watch')) return <Watch size={20} />;
    if (name.includes('art')) return <Palette size={20} />;
    if (name.includes('beauty')) return <Sparkles size={20} />;
    if (name.includes('book')) return <Book size={20} />;
    if (name.includes('computer')) return <Monitor size={20} />;
    if (name.includes('electr')) return <Smartphone size={20} />;
    if (name.includes('furnitur')) return <Armchair size={20} />;
    if (name.includes('jewel')) return <Diamond size={20} />;
    if (name.includes('kitchen')) return <Utensils size={20} />;
    
    return <LayoutGrid size={20} />
  };

  return (
    <div className="w-full md:w-64 flex-shrink-0 bg-white mr-8 p-4 rounded-xl border border-gray-100 shadow-sm h-fit">
      <h3 className="font-semibold text-gray-800 mb-4 px-2">Categories</h3>
      <div className="space-y-1">
        <button
          onClick={() => onSelectCategory("")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
            selectedCategory === "" 
              ? "bg-gray-100 text-gray-900 shadow-sm" 
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          }`}
        >
          <LayoutGrid size={20} />
          <span>All Categories</span>
        </button>

        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectCategory(c.name)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
              selectedCategory === c.name 
                ? "bg-gray-100 text-gray-900 shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            }`}
          >
            {getIcon(c.name)}
            <span>{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
