import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="bg-[#e6f7e2] text-green-950 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-0">
        <img src="/logo.png" alt="Henna Logo" className="w-13 h-8" />
        <span className="text-xl font-semibold">PakHenna</span>
      </div>
      <nav className="flex space-x-6 font-medium">
        <Link to="/" className="hover:text-green-800 hover:underline">Home</Link>
        <Link to="/products" className="hover:text-green-800 hover:underline">Products</Link>

        <Link to="/#contact" className="hover:text-green-800 hover:underline">Contact Us</Link>
        <Link to="/#about" className="hover:text-green-800 hover:underline">About Us</Link>
      </nav>

      <Link to="/cart" aria-label="Shopping Cart">
        <button className="bg-[#b3c07e] hover:bg-[#a2ae73] text-green-900 p-2 rounded-full flex items-center justify-center">
          <ShoppingCart size={20} />
        </button>
      </Link>
    </header>
  );
}
