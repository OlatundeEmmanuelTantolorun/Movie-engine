const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await response.json();
  return data.results;
};

export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`,
    );
    const data = await response.json();

    // Find a video that is a Trailer and hosted on YouTube
    const trailer = data.results?.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    );

    // Return the YouTube key (e.g., "dQw4w9WgXcQ") or null if not found
    return trailer ? trailer.key : null;
  } catch (err) {
    console.error("Error fetching trailer:", err);
    return null;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`,
    );

    const data = await response.json();

    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchSimilarMovies = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`,
    );

    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error("Error fetching similar movies:", err);
    return [];
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data.results; // Returns movies coming soon to theaters
  } catch (err) {
    console.error("Error fetching upcoming movies:", err);
    return [];
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchNowPlayingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};
