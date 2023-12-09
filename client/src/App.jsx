import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RecipeList from './Components/RecipeList';
import RecipeForm from './Components/RecipeForm';
import Login from './Components/Login';
import Header from './Components/Header';

const HeroSection = () => {
  const backgroundImage = 'https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0';

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, var(--secondary-color), transparent)`,
          backdropFilter: 'blur(8px)',
        }}
      />
      <img
        className="object-cover w-full h-full"
        src={backgroundImage}
        alt="Background"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
        <h1 className="text-6xl font-bold mb-4 text-glow">ReceptesKönyv</h1>
        <p className="text-xl font-semibold mb-8">Ízletes ételek egyenesen az asztalodhoz!</p>
      </div>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = (username) => {
    setUser(username);
    setLoggedIn(true);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem('username');
  };

  return (
   
      <Router>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
            <Route
            path="/"
            element={
              <>
                <HeroSection />
                <RecipeList user={user} />
              </>
            }
          />  
          <Route path="/new-recipe" element={user ? <RecipeForm /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    
  );
};

export default App;
