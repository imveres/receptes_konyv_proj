import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-accent-color p-8 z-50 ">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold py-2 px-4">ReceptesKönyv</Link>
        <nav>
          {isLoggedIn && (
            <Link to="/new-recipe" className="text-white ml-4 py-2 px-4">
              Új recept
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={() => {
                onLogout();
                navigate('/');
              }}
              className="text-white ml-4 py-2 px-4">
              Kijelentkezés
            </button>
          ) : (
            <Link to="/login" className="text-white ml-4 py-2 px-4">
              Bejelentkezés
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
