import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const RecipeList = ({ user }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recipes');
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      } catch (error) {
        console.error('Hiba a receptek lekérdezésekor:', error.message);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = recipes.filter((recipe) => {
      const titleMatch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
      const ingredientsMatch =
        Array.isArray(recipe.ingredients) &&
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return titleMatch || ingredientsMatch;
    });

    setFilteredRecipes(filtered.length > 0 ? filtered : recipes);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(selectedRecipe === recipe ? null : recipe);
  };

  return (
    <div className="container mx-auto text-center my-8">
      <h2 className="text-4xl font-bold mb-8 text-accent-color">Receptjeink</h2>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-amber-50 bg-opacity-20 p-6 rounded-md shadow-xl transition-transform hover:scale-105 cursor-pointer"
            onClick={() => handleRecipeClick(recipe)}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h3 className="text-xl font-semibold mb-2 text-accent-color">{recipe.title}</h3>
            {selectedRecipe === recipe && (
              <div>
                <h4 className="text-lg font-semibold mb-2">Hozzávalók:</h4>
                <ul className="list-disc pl-6">
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-gray-200">{ingredient}</li>
                  ))}
                </ul>
                <h4 className="text-lg font-semibold mt-4">Elkészítés:</h4>
                <p className="mt-2 text-gray-200">{recipe.instructions}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
