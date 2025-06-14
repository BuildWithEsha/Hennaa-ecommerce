import React, { useEffect, useState, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";

export default function Products() {
  const { addItem } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const productsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    AOS.init({ duration: 850, once: true });

    fetch(`${import.meta.env.VITE_API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, 2, 3, "...", totalPages);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
        >
          &lt;
        </button>
        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-[#a2ae73] text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    );
  };

  const addToCart = (product) => {
    addItem(product);
    navigate("/cart");
  };

  return (
    <div className="bg-[#e6f7e2] min-h-screen px-4 sm:px-10 md:px-20 py-3 flex flex-col scroll-smooth">
      <Header />
      <main className="flex-grow p-6 sm:p-12">
        <h2
          className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8"
          data-aos="fade-down"
        >
          Our Products
        </h2>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[#bfc79f] p-4 sm:p-6 rounded-md text-center flex flex-col justify-between min-h-[200px]"
                data-aos="fade-up"
                data-aos-delay={parseInt(product._id, 10) || 0}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="mb-3 sm:mb-4 mx-auto max-h-28 sm:max-h-32 object-contain"
                />
                <h3 className="font-semibold mb-1 text-sm sm:text-base truncate">{product.title}</h3>
                <p className="text-md sm:text-lg font-medium mb-3">Price: {product.price}</p>
                <button
                  className="bg-[#a2ae73] hover:bg-[#89935f] text-white px-3 py-2 rounded text-sm sm:text-base"
                  onClick={() => addToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        )}

        {renderPagination()}
      </main>
    </div>
  );
}
