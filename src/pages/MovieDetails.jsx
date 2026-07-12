import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlinePlayCircle } from "react-icons/ai";

import {
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchMovieReviews,
  fetchSimilarMovies,
} from "../services/api";

import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MovieContext";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { favorites, addToFavorites, removeFromFavorites } = useMovieContext();

  const isFavorite = favorites.some((fav) => fav.id === Number(id));

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const handleWatchTrailer = async () => {
    if (!trailerKey) {
      const key = await fetchMovieTrailer(movie.id);

      if (key) {
        setTrailerKey(key);
        setIsModalOpen(true);
      } else {
        alert("Sorry, no trailer available for this movie.");
      }
    } else {
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);

        const [movieData, reviewsData, similarData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieReviews(id),
          fetchSimilarMovies(id),
        ]);

        setMovie(movieData);
        setReviews(reviewsData);
        setSimilarMovies(similarData);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center mt-10">
        Movie not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen min-w-full bg-neutral-950 text-white mt-13">
      {/* ================= HERO ================= */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Backdrop */}
        <img
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : "/src/assets/hero.png"
          }
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-20 h-full flex items-end">
          <div className="w-full px-6 md:px-16 lg:px-24 pb-16">
            <div className="max-w-3xl">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-5 py-3 rounded-xl transition"
              >
                ← Back
              </button>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-black leading-none">
                {movie.title}
              </h1>

              {/* Genres */}
              <div className="flex flex-wrap gap-3 mt-8">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <p className="mt-8 text-neutral-200 text-lg leading-9 max-w-2xl">
                {movie.overview}
              </p>

              {/* Buttons */}
              {/* Meta */}
              <div className="flex flex-wrap gap-4 mt-10">
                <button
                  onClick={handleWatchTrailer}
                  className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                >
                  <AiOutlinePlayCircle size={24} />
                  Watch Trailer
                </button>

                <button
                  onClick={toggleFavorite}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition ${
                    isFavorite
                      ? "bg-pink-600 hover:bg-pink-700"
                      : "bg-neutral-800 hover:bg-neutral-700"
                  }`}
                >
                  {isFavorite ? <FaHeart size={20} /> : <FiHeart size={20} />}

                  {isFavorite ? "Remove Favorite" : "Add Favorite"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= EXTRA INFO ================= */}

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid lg:grid-cols-[300px_1fr] gap-10">
          {/* Poster */}

          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/src/assets/hero.png"
            }
            alt={movie.title}
            className="rounded-2xl shadow-2xl w-full max-w-sm mx-auto"
          />

          {/* Details */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Movie Information</h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-neutral-900 rounded-xl p-5">
                <p className="text-neutral-500 text-sm">Original Title</p>

                <p className="font-semibold mt-2">{movie.original_title}</p>
              </div>

              <div className="bg-neutral-900 rounded-xl p-5">
                <p className="text-neutral-500 text-sm">Status</p>

                <p className="font-semibold mt-2">{movie.status}</p>
              </div>

              <div className="bg-neutral-900 rounded-xl p-5">
                <p className="text-neutral-500 text-sm">Runtime</p>

                <p className="font-semibold mt-2">{movie.runtime} minutes</p>
              </div>

              <div className="bg-neutral-900 rounded-xl p-5">
                <p className="text-neutral-500 text-sm">Release Date</p>

                <p className="font-semibold mt-2">{movie.release_date}</p>
              </div>

              <div className="bg-neutral-900 rounded-xl p-5">
                <p className="text-neutral-500 text-sm">Original Language</p>

                <p className="font-semibold mt-2 uppercase">
                  {movie.original_language}
                </p>
              </div>

              <div className="bg-neutral-900 rounded-xl p-5">
                <p className="text-neutral-500 text-sm">Rating</p>

                <p className="font-semibold mt-2">
                  ⭐ {movie.vote_average?.toFixed(1)} / 10
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <h2 className="text-3xl font-bold mb-8">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-neutral-400">No reviews available.</p>
        ) : (
          <div className="space-y-6">
            {reviews.slice(0, 5).map((review) => (
              <div
                key={review.id}
                className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg">{review.author}</h3>

                  <span className="text-yellow-400">
                    ⭐ {review.author_details.rating ?? "N/A"}
                  </span>
                </div>

                <p className="text-neutral-300 mt-4 leading-7 line-clamp-6">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
        <h2 className="text-3xl font-bold mb-8">Similar Movies</h2>

        <div className="flex gap-6 overflow-x-auto pb-4">
          {similarMovies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-60">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </section>

      {/* ================= TRAILER MODAL ================= */}

      {isModalOpen && trailerKey && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-5xl rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
            <div className="flex justify-between items-center p-5 border-b border-neutral-800">
              <h2 className="font-bold text-lg">{movie.title}</h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <IoCloseOutline size={32} />
              </button>
            </div>

            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title={movie.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MovieDetails;
