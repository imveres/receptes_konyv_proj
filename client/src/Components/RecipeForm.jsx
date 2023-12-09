import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ onRecipeAdded }) => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageLink, setImageLink] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/recipes', {
        title: recipeName,
        ingredients: ingredients.split('\n').map((ingredient) => ingredient.trim()),
        instructions,
        image: imageLink,
      });

      if (response && response.data && response.data.success) {
        onRecipeAdded();
        setRecipeName('');
        setIngredients('');
        setInstructions('');
        setImageLink('');
      }
    } catch (error) {
      console.error('Error adding recipe:', error.message);
    }
  };

  return (
    <div className="container mx-auto text-center my-8">
      <h2 className="text-4xl font-bold mb-8 text-accent-color">Új recept hozzáadása</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="recipeName" className="block text-gray-100">
              Recipe Name:
            </label>
            <input
              type="text"
              id="recipeName"
              name="recipeName"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-accent-color"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-gray-100">
              Hozzávalók:
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-accent-color"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="instructions" className="block text-gray-100">
              Elkészítés:
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-accent-color"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="imageLink" className="block text-gray-100">
              Kép link: 
            </label>
            <input
              type="text"
              id="imageLink"
              name="imageLink"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-accent-color"
            />
          </div>
          <button
          onClick={handleSubmit}
          className="w-full py-2 px-4 bg-accent-color text-white rounded-md hover:bg-highlight-color"> Hozzáadás
        </button>
      </form>
      </div>
    );
  };
  
  export default RecipeForm;
