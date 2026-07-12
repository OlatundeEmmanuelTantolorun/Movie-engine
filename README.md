# 🎬 Movie Engine

> **Discover your next favorite movie.**

Movie Engine is a modern movie discovery platform built with **React**, **Vite**, and **The Movie Database (TMDB) API**. It helps users effortlessly explore trending movies, upcoming releases, top-rated films, and detailed movie information—all within a fast, responsive, and visually immersive interface.

Whether you're searching for a movie to watch tonight or browsing upcoming releases, Movie Engine provides an intuitive experience with trailers, reviews, recommendations, and personalized favorites.

---

## ✨ Preview

> _Screenshots will be added soon._

---

## 🚀 Features

### 🎥 Movie Discovery

- Trending Movies
- Popular Movies
- Top Rated Movies
- Now Playing
- Coming Soon Releases

### 🔍 Smart Search

- Search movies by title
- Instant search results
- Clean search interface

### 📄 Movie Details

- Beautiful cinematic hero section
- High-resolution backdrop
- Movie overview
- Genres
- Runtime
- Release date
- Ratings
- Original language
- Official trailer

### ❤️ Favorites

- Save favorite movies
- Persistent favorites
- Quick access from Favorites page

### 📱 User Experience

- Responsive design
- Modern UI
- Smooth animations
- Mobile-first layout
- Fast loading experience

---

## 🛠️ Built With

- React
- Vite
- React Router
- Tailwind CSS
- Context API
- TMDB API
- Vercel

---

## 📂 Project Structure

```text
MovieEngine/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   └── layout/
│
├── api/                 # Vercel Serverless Functions
│
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/OlatundeEmmanuelTantolorun/Movie-engine.git
```

Navigate into the project

```bash
cd movie-engine
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root.

```env
VITE_TMDB_API_URL=https://api.themoviedb.org/3
```

> The TMDB API key is **not stored in the frontend**. Production requests are securely proxied through Vercel Serverless Functions using protected environment variables.

---

## 🌐 Deployment

This project is deployed on **Vercel**.

For production:

- Import the repository into Vercel.
- Configure the required environment variables.
- Deploy with automatic GitHub integration.

---

## 📌 Roadmap

### Completed

- [x] Trending Movies
- [x] Popular Movies
- [x] Upcoming Movies
- [x] Now Playing
- [x] Top Rated Movies
- [x] Search Movies
- [x] Favorites
- [x] Movie Details
- [x] Trailer Modal

### In Progress

- [ ] Secure backend API with Vercel Functions
- [ ] Reviews
- [ ] Similar Movies
- [ ] Cast Information
- [ ] Pagination
- [ ] Skeleton Loading
- [ ] Toast Notifications

### Future Features

- [ ] User Authentication
- [ ] Watchlists
- [ ] AI Movie Recommendations
- [ ] TV Shows
- [ ] Dark/Light Themes
- [ ] User Ratings
- [ ] Movie Collections
- [ ] Streaming Availability
- [ ] Advanced Filters
- [ ] PWA Support

---

## 📈 Performance Goals

- Responsive across all devices
- Fast page loads
- Optimized API requests
- Secure API architecture
- Accessible user interface

---

## 🤝 Contributing

Contributions are welcome.

If you'd like to improve Movie Engine:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

## 🙏 Acknowledgements

- The Movie Database (TMDB)
- React
- Vite
- Tailwind CSS
- Vercel

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Olatunde Emmanuel Tantolorun**

Passionate Frontend Developer focused on building modern, scalable, and user-friendly web applications.

- GitHub: https://github.com/OlatundeEmmanuelTantolorun

---

> **Movie Engine — Discover your next favorite movie.**
