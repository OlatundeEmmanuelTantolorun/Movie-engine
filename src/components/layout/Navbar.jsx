import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/myLogoB.png";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-6 md:px-12 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="MovieApp Logo"
            className="h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      <div className="flex items-center gap-6 md:gap-8 text-sm font-semibold tracking-wide">
        <Link
          to="/"
          className={`transition-colors duration-300 ${
            isActive("/")
              ? "text-red-500 font-bold"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
        >
          Home
        </Link>
        <Link
          to="/favorites"
          className={`transition-colors duration-300 ${
            isActive("/favorites")
              ? "text-red-500 font-bold"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
