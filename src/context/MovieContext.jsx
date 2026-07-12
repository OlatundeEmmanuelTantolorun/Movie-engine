import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (movie) => {
    if (favorites.some((m) => m.id === movie.id)) return;

    setFavorites([...favorites, movie]);
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter((movie) => movie.id !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((movie) => movie.id === id);
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
