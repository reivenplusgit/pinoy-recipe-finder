import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext.jsx';
import recipesData from '../../data/recipes.json';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const recipe = recipesData.find(recipe => recipe.id === parseInt(id));
  
  if (!recipe) {
    return (
      <div className="recipe-detail">
        <div className="container">
          <h2>Recipe not found</h2>
          <button onClick={() => navigate('/')} className="back-button">
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  const favorite = isFavorite(recipe.id);
  
  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="recipe-detail">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        
        <div className="recipe-detail-content">
          <div className="recipe-detail-image">
            <img src={recipe.image} alt={recipe.name} />
          </div>
          
          <div className="recipe-detail-info">
            <h1>{recipe.name}</h1>
            <p className="recipe-description">{recipe.description}</p>
            
            <div className="recipe-meta">
              <span>⏱️ {recipe.cookingTime}</span>
              <span>👨‍👩‍👧‍👦 {recipe.servings} servings</span>
            </div>
            
            <div className="ingredients-section">
              <h2>Ingredients</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            
            <div className="instructions-section">
              <h2>Instructions</h2>
              <ol>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;