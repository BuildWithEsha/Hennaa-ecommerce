import React, { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      } else {
        const errorData = await res.json();
        console.error('Delete failed:', errorData);
      }
    } catch (error) {
      console.error('Delete request failed:', error);
    }
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Product List
      </h3>

      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {products.map((p) => (
          <li
            key={p._id}
            className="bg-[#FBE4D8] rounded-lg shadow-md p-4 flex flex-col items-center w-full"
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded mb-4"
                loading="lazy"
              />
            )}
            <div className="flex flex-col items-center text-center w-full">
              <p className="font-semibold text-md text-gray-900 truncate w-full">{p.title}</p>
              <p className="text-gray-700 mt-1 mb-2 text-sm">Price {p.price}</p>
              <button
                onClick={() => handleDelete(p._id)}
                className="bg-[#854F6C] text-white text-sm font-medium rounded py-1.5 px-4 hover:bg-[#6f3f56] transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
