import React from 'react';
import SearchBar from './SearchBar';

const Home = () => {
  const backgroundImage = 'https://burst.shopifycdn.com/photos/flatlay-iron-skillet-with-meat-and-other-food.jpg?width=1000&format=pjpg&exif=0&iptc=0';

  return (
    <div
      className="h-3/4 flex flex-col items-center justify-center relative bg-cover bg-center backdrop-filter backdrop-blur-lg"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-6xl font-bold text-white mb-4">RecipeBook</h1>
      <p className="text-xl font-semibold text-white mb-8">Ízletes ételek egyenesen az asztalodhoz!</p>
      <SearchBar className="w-128 h-12" />
    </div>
  );
};

export default Home;
