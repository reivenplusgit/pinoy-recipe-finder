import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

// This function runs ONLY once, on the initial render, to get the starting value.
const getInitialFavorites = () => {
  try {
    const storedFavorites = localStorage.getItem('recipeFavorites');
    // If favorites are found in localStorage, parse them, otherwise return an empty array.
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  } catch (error) {
    console.error("Failed to parse favorites from localStorage", error);
    return [];
  }
};

export const FavoritesProvider = ({ children }) => {
  // Initialize state by calling our function. This is the key change!
  const [favorites, setFavorites] = useState(getInitialFavorites());

  // This useEffect now ONLY handles SAVING to localStorage when favorites change.
  useEffect(() => {
    try {
      localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage", error);
    }
  }, [favorites]);

  const addFavorite = (recipe) => {
    // Add the new recipe, ensuring no duplicates
    setFavorites(prevFavorites => {
      if (prevFavorites.some(fav => fav.id === recipe.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, recipe];
    });
  };

  const removeFavorite = (recipeId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(recipe => recipe.id !== recipeId)
    );
  };

  const isFavorite = (recipeId) => {
    return favorites.some(recipe => recipe.id === recipeId);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    favoritesCount: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};