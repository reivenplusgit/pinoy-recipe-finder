import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import './RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const { id, name, image, description, cookingTime, servings } = recipe;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const favorite = isFavorite(id);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <div className="recipe-card">
      <Link to={`/recipe/${id}`} className="recipe-link">
        <div className="recipe-image-container">
          <img src={image} alt={name} className="recipe-image" />
          <button 
            className={`favorite-heart ${favorite ? 'favorited' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ♥
          </button>
        </div>
        <div className="recipe-content">
          <h3 className="recipe-title">{name}</h3>
          <p className="recipe-description">{description}</p>
          <div className="recipe-meta">
            <span className="cooking-time">⏱️ {cookingTime}</span>
            <span className="servings">👨‍👩‍👧‍👦 {servings} servings</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;