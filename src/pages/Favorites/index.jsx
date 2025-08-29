import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext.jsx';
import RecipeCard from '../../components/RecipeCard';
import './Favorites.css';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="favorites">
      <div className="container">
        <h1 className="page-title">Your Favorite Recipes</h1>
        
        {favorites.length > 0 ? (
          <div className="recipes-grid">
            {favorites.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            <p>You haven't added any favorites yet.</p>
            <p>Browse recipes and click "Add to Favorites" to save them here!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;