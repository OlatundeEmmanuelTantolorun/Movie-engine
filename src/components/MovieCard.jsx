import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { fetchMovieTrailer } from "../services/api";
import { useMovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MovieCard = ({ movie }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  const liked = (e) => {
    e.stopPropagation();

    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
      toast.info(`${movie.title} removed from favorites`);
    } else {
      addToFavorites(movie);
      toast.success(`${movie.title} added to favorites ❤️`);
    }
  };

  const handleWatchTrailer = async (e) => {
    e.stopPropagation();

    if (!trailerKey) {
      const key = await fetchMovieTrailer(movie.id);
      if (key) {
        setTrailerKey(key);
        setIsModalOpen(true);
      } else {
        toast.error("Sorry, no trailer available.");
      }
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={() => navigate(`/movie/${movie.id}`)}
        className="group relative cursor-pointer bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-950">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/src/assets/hero.png"
            }
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-full translate-x-full group-hover:translate-y-0 group-hover:translate-x-0 transition-transform duration-300 ease-out z-20" />

          <div className="absolute top-3 right-3 z-30">
            <button
              className="cursor-pointer text-neutral-400 hover:text-red-500 bg-neutral-950/70 p-2 rounded-full backdrop-blur-md transition-colors duration-300"
              onClick={liked}
            >
              {isFavorite(movie.id) ? (
                <AiFillHeart className="text-red-500" size={18} />
              ) : (
                <AiFillHeart className="text-neutral-400" size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="p-4 bg-neutral-900/50 flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-neutral-200 group-hover:text-white truncate transition-colors duration-200">
              {movie.title}
            </h2>

            <p className="text-xs text-neutral-500 mt-1 font-medium">
              {movie.release_date
                ? new Date(movie.release_date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </p>
          </div>

          <button
            onClick={handleWatchTrailer}
            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-2 rounded-md transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Watch Trailer
          </button>
        </div>
      </div>

      {isModalOpen && trailerKey && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-3xl bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-900 bg-neutral-900/50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex items-center gap-2 text-neutral-400 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded-md transition-colors"
              >
                <span>←</span> Close
              </button>
              <span className="text-xs font-semibold text-neutral-400 truncate max-w-[60%]">
                {movie.title} - Trailer
              </span>
            </div>

            <div className="relative w-full aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title={`${movie.title} Official Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
