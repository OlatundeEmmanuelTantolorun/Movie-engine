import React from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

const Favorite = () => {
  const { favorites } = useMovieContext();

  if (favorites.length === 0) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-100 pt-32 px-6 flex flex-col items-center justify-center text-center pb-12">
        <div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 text-red-500/40">
          <FiHeart size={36} />
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-200 mb-3">
          No Favorite Movies Yet
        </h2>

        <p className="max-w-md text-sm md:text-base text-neutral-500 leading-relaxed mb-8">
          Start adding movies to your personal watch list, and your absolute
          favorites will appear right here.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300"
        >
          Go Back to Explore
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 pt-24 px-6 md:px-12 pb-12">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
};

export default Favorite;
