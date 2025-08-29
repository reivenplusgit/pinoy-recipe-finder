import React, { useState, useEffect } from 'react';
import RecipeCard from '../../components/RecipeCard';
import SearchBar from '../../components/SearchBar';
import recipesData from '../../data/recipes.json';
import './Home.css';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setRecipes(recipesData);
    setFilteredRecipes(recipesData);
  }, []);

  useEffect(() => {
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  return (
    <div className="home">
      <div className="container">
        <h1 className="page-title">Filipino Recipes</h1>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        
        {filteredRecipes.length > 0 ? (
          <div className="recipes-grid">
            {filteredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>No recipes found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;