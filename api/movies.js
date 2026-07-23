export default async function handler(request, response) {
  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  const { endpoint, query } = request.query;

  if (!endpoint) {
    return response
      .status(400)
      .json({ error: "Endpoint parameter is required" });
  }

  try {
    const separator = endpoint.includes("?") ? "&" : "?";

    const searchQuery = query ? `&query=${encodeURIComponent(query)}` : "";

    const targetUrl = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}${searchQuery}`;

    const apiRes = await fetch(targetUrl);

    if (!apiRes.ok) {
      return response
        .status(apiRes.status)
        .json({ error: "Failed to fetch from TMDB" });
    }

    const data = await apiRes.json();

    response.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate",
    );

    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
