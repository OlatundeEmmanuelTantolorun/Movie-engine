import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Navbar from "./components/layout/Navbar";
import { Routes, Route } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
