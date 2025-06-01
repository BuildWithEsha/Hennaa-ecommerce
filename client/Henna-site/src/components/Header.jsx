import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuOpen ? menuRef.current.scrollHeight : 0);
    }
  }, [menuOpen]);

  return (
    <header className="bg-[#e6f7e2] text-green-950 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Henna Logo" className="w-13 h-8" />
          <span className="text-xl font-semibold">PakHenna</span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-green-800 hover:underline">Home</Link>
          <Link to="/products" className="hover:text-green-800 hover:underline">Products</Link>
          <Link to="/#contact" className="hover:text-green-800 hover:underline">Contact Us</Link>
          <Link to="/#about" className="hover:text-green-800 hover:underline">About Us</Link>
        </nav>

        {/* Cart & Mobile menu button */}
        <div className="flex items-center space-x-4">
          <Link to="/cart" aria-label="Shopping Cart">
            <button className="bg-[#b3c07e] hover:bg-[#a2ae73] text-green-900 p-2 rounded-full flex items-center justify-center">
              <ShoppingCart size={20} />
            </button>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Animated Mobile nav menu */}
      <nav
        ref={menuRef}
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out font-medium px-4"
        style={{
          maxHeight: menuHeight,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col space-y-1 py-2">
          <Link
            to="/"
            className="block px-3 py-2 text-lg rounded-md hover:bg-[#b3c07e] hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="block px-3 py-2 text-lg rounded-md hover:bg-[#b3c07e] hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/#contact"
            className="block px-3 py-2 text-lg rounded-md hover:bg-[#b3c07e] hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            to="/#about"
            className="block px-3 py-2 text-lg rounded-md hover:bg-[#b3c07e] hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            About Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
