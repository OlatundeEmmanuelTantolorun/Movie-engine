import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/myLogoB.png";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-6 md:px-12 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-neutral-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      {/* Logo with a modern subtle glow (neutral/white) */}
      <Link to="/" className="flex items-center gap-2 group">
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-white/5 blur-md group-hover:bg-white/10 transition duration-500" />
          <img
            src={Logo}
            alt="MovieApp Logo"
            className="relative h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(255,255,255,0.08)]"
          />
        </div>
      </Link>

      {/* Navigation links – red active state */}
      <div className="flex items-center gap-6 md:gap-8 text-sm font-medium tracking-wide">
        <Link
          to="/"
          className={`relative transition-all duration-300 ${
            isActive("/")
              ? "text-red-500 font-semibold"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
        >
          Home
          {isActive("/") && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
          )}
        </Link>
        <Link
          to="/favorites"
          className={`relative transition-all duration-300 ${
            isActive("/favorites")
              ? "text-red-500 font-semibold"
              : "text-neutral-400 hover:text-neutral-100"
          }`}
        >
          Favorites
          {isActive("/favorites") && (
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-400 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
