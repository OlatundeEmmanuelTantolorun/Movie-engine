import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col pt-8">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/favorites" element={<Favorite />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
