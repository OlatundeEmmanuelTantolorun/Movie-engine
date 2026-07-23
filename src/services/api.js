// src/services/api.js

// Helper function to query your local serverless proxy
const fetchFromProxy = async (endpoint, query = "") => {
  try {
    const url = `/api/movies?endpoint=${encodeURIComponent(endpoint)}${
      query ? `&query=${encodeURIComponent(query)}` : ""
    }`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error(`Error fetching proxy endpoint ${endpoint}:`, err);
    return null;
  }
};

export const fetchMovies = async () => {
  const data = await fetchFromProxy("/movie/popular");
  return data?.results || [];
};

export const fetchMovieDetails = async (id) => {
  return await fetchFromProxy(`/movie/${id}`);
};

export const searchMovies = async (query) => {
  if (!query) return [];
  const data = await fetchFromProxy("/search/movie", query);
  return data?.results || [];
};

export const fetchMovieTrailer = async (movieId) => {
  const data = await fetchFromProxy(`/movie/${movieId}/videos`);
  if (!data?.results) return null;

  const trailer =
    data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    ) || data.results.find((video) => video.site === "YouTube");

  return trailer ? trailer.key : null;
};

export const fetchMovieReviews = async (movieId) => {
  const data = await fetchFromProxy(`/movie/${movieId}/reviews`);
  return data?.results || [];
};

export const fetchSimilarMovies = async (id) => {
  const data = await fetchFromProxy(`/movie/${id}/similar`);
  return data?.results || [];
};

export const fetchUpcomingMovies = async () => {
  const data = await fetchFromProxy("/movie/upcoming");
  return data?.results || [];
};

export const fetchTopRatedMovies = async () => {
  const data = await fetchFromProxy("/movie/top_rated");
  return data?.results || [];
};

export const fetchNowPlayingMovies = async () => {
  const data = await fetchFromProxy("/movie/now_playing");
  return data?.results || [];
};

export const fetchTrendingMovies = async () => {
  const data = await fetchFromProxy("/trending/movie/week");
  return data?.results || [];
};
