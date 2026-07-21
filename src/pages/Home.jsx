import React from "react";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import {
  searchMovies,
  fetchMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchTrendingMovies,
} from "../services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]); // New state for upcoming movies
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const loadAllMovies = async () => {
      try {
        const [
          popularData,
          upcomingData,
          topRatedData,
          nowPlayingData,
          trendingData,
        ] = await Promise.all([
          fetchMovies(),
          fetchUpcomingMovies(),
          fetchTopRatedMovies(),
          fetchNowPlayingMovies(),
          fetchTrendingMovies(),
        ]);

        setMovies(popularData);
        setUpcomingMovies(upcomingData);
        setTopRatedMovies(topRatedData);
        setNowPlayingMovies(nowPlayingData);
        setTrendingMovies(trendingData);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch dashboard content.");
      } finally {
        setLoading(false);
      }
    };

    loadAllMovies();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;

    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults([]);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);

      const results = await searchMovies(searchQuery);
      setSearchResults(results);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 pt-24 px-2 md:px-12 pb-12">
      <div className="max-w-xl mx-auto mb-12">
        <form
          onSubmit={handleSearch}
          className="group relative flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1.5 focus-within:border-red-500/50 transition-colors duration-300"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for movies..."
            className="w-full bg-transparent pl-3 pr-24 py-2 text-sm text-neutral-100 outline-none placeholder-neutral-500"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 bottom-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider px-4 rounded-md transition-colors duration-200"
          >
            Search
          </button>
        </form>
      </div>

      {error && <p className="text-center text-red-500 mb-6">{error}</p>}

      {searchResults.length > 0 ? (
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-extrabold tracking-tight">
              Search Results
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
            {searchResults.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      ) : loading ? (
        <p className="text-center text-neutral-500">Loading...</p>
      ) : (
        <div className="space-y-16">
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold tracking-tight text-neutral-100">
                Trending Movies
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                The most popular movies streaming globally right now.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2">
              {trendingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          {/* 1. Upcoming / Yet to be released section */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold tracking-tight text-neutral-100">
                Recent drop and Upcoming Movies
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Highly anticipated releases with trailers ready to watch.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {upcomingMovies?.slice(0, 6).map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold tracking-tight text-neutral-100">
                Now Playing
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Movies currently playing in theaters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {nowPlayingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold tracking-tight text-neutral-100">
                Top Rated Movies
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Highest-rated movies of all time.
              </p>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-4">
              {topRatedMovies.map((movie) => (
                <div key={movie.id} className="flex-shrink-0 w-60">
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </section>

          {/* 2. General / Popular movies section */}
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-extrabold tracking-tight text-neutral-100">
                Popular Movies
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                The most popular movies streaming globally right now.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Home;
