import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext.jsx';
import './Header.css';

const Header = () => {
  const { favoritesCount } = useFavorites();

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            Pinoy Recipe Finder
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/favorites" className="nav-link">
                Favorites ({favoritesCount})
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;