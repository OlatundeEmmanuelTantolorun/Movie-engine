import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { AiOutlinePlayCircle } from "react-icons/ai";
import {
  FiHeart,
  FiArrowLeft,
  FiStar,
  FiClock,
  FiCalendar,
  FiGlobe,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import {
  fetchMovieDetails,
  fetchMovieTrailer,
  fetchMovieReviews,
  fetchSimilarMovies,
} from "../services/api";

import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../context/MovieContext";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { favorites, addToFavorites, removeFromFavorites } = useMovieContext();
  const isFavorite = favorites.some((fav) => fav.id === Number(id));

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

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
        setTrailerKey(null);

        const [movieData, reviewsData, similarData] = await Promise.all([
          fetchMovieDetails(id),
          fetchMovieReviews(id),
          fetchSimilarMovies(id),
        ]);

        setMovie(movieData);
        setReviews(reviewsData);
        setSimilarMovies(similarData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-400 font-medium text-sm">
            Loading details...
          </p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-400 text-lg">Movie not found.</p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-semibold transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <main className="w-full">
      <section className="relative w-full h-[calc(100vh-4rem)] min-h-[550px] overflow-hidden">
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

        {/* Gradient Overlays for readability */}
        <div className="absolute inset-0 bg-neutral-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

        <div className="relative z-10 h-full flex items-end">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-12">
            <div className="max-w-3xl">
              <button
                onClick={() => navigate(-1)}
                className="mb-6 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
              >
                <FiArrowLeft size={16} />
                <span>Back</span>
              </button>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap gap-2 mt-4">
                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-medium text-neutral-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-neutral-300 text-base md:text-lg leading-relaxed line-clamp-4">
                {movie.overview}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <button
                  onClick={handleWatchTrailer}
                  className="flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-red-600/20 active:scale-95"
                >
                  <AiOutlinePlayCircle size={22} />
                  <span>Watch Trailer</span>
                </button>

                <button
                  onClick={toggleFavorite}
                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                    isFavorite
                      ? "bg-neutral-800 text-pink-500 border border-pink-500/30 hover:bg-neutral-700"
                      : "bg-neutral-800/80 hover:bg-neutral-700 text-white border border-neutral-700"
                  }`}
                >
                  {isFavorite ? <FaHeart size={18} /> : <FiHeart size={18} />}
                  <span>
                    {isFavorite ? "In Favorites" : "Add to Favorites"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-start">
          <div className="w-full max-w-xs mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/src/assets/hero.png"
              }
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-neutral-100">
              Movie Details
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <DetailCard label="Original Title" value={movie.original_title} />
              <DetailCard label="Status" value={movie.status} />
              <DetailCard
                icon={<FiClock className="text-red-500" />}
                label="Runtime"
                value={`${movie.runtime || "N/A"} mins`}
              />
              <DetailCard
                icon={<FiCalendar className="text-red-500" />}
                label="Release Date"
                value={movie.release_date || "N/A"}
              />
              <DetailCard
                icon={<FiGlobe className="text-red-500" />}
                label="Original Language"
                value={movie.original_language?.toUpperCase()}
              />
              <DetailCard
                icon={<FiStar className="text-yellow-400" />}
                label="Rating"
                value={`${movie.vote_average?.toFixed(1)} / 10`}
              />
            </div>
          </div>
        </div>
      </section>

      {/*  REVIEWS SECTION  */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-8 border-t border-neutral-900">
        <h2 className="text-2xl font-bold mb-6 text-neutral-100">Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-neutral-500 text-sm">
            No reviews available for this movie.
          </p>
        ) : (
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div
                key={review.id}
                className="bg-neutral-900/60 rounded-xl p-5 border border-neutral-800/80"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-neutral-200">
                    {review.author}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-yellow-400 bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-700">
                    <FiStar size={12} />
                    {review.author_details?.rating ?? "N/A"}
                  </span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-4">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/*  SIMILAR MOVIES SECTION  */}
      {similarMovies.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 border-t border-neutral-900">
          <h2 className="text-2xl font-bold mb-6 text-neutral-100">
            Similar Movies
          </h2>

          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-800">
            {similarMovies.map((simMovie) => (
              <div key={simMovie.id} className="flex-shrink-0 w-52">
                <MovieCard movie={simMovie} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/*  TRAILER MODAL  */}
      {isModalOpen && trailerKey && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-800">
              <h3 className="font-semibold text-neutral-200">
                {movie.title} — Trailer
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white transition"
              >
                <IoCloseOutline size={28} />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                title={`${movie.title} Trailer`}
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

const DetailCard = ({ icon, label, value }) => (
  <div className="bg-neutral-900/60 border border-neutral-800/80 rounded-xl p-4">
    <div className="flex items-center gap-2 text-neutral-500 text-xs font-medium uppercase tracking-wider">
      {icon}
      <span>{label}</span>
    </div>
    <p className="font-semibold text-neutral-200 mt-1.5 text-base">
      {value || "N/A"}
    </p>
  </div>
);

export default MovieDetails;
