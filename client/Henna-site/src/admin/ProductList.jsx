import React, { useEffect, useState } from 'react';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
    const data = await res.json();
    console.log('Fetched products:', data); 
    setProducts(data);
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        method: 'DELETE',
      });

      console.log('Delete response status:', res.status);
      if (res.ok) {
        setProducts(products.filter(p => p._id !== id));
      } else {
        let errorData;
        try {
          errorData = await res.json();
        } catch {
          errorData = { message: 'Non-JSON error response' };
        }
        console.error('Delete failed:', errorData);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  return (
    <div
      className="min-h-screen p-8"
    >
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Product List</h3>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((p) => (
          <li
            key={p._id}
            className="rounded-lg shadow-md p-4 flex flex-col items-center"
            style={{ backgroundColor: '#FBE4D8' }}
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.title}
                className="w-40 h-40 object-cover rounded mb-4"
                loading="lazy"
              />
            )}
            <p className="font-semibold text-lg text-gray-900 text-center">{p.title}</p>
            <p className="text-gray-700 mt-1 mb-4">Price {p.price}</p>

            <button
              onClick={() => handleDelete(p._id)}
              className="mt-auto w-full bg-[#854F6C] text-white font-medium text-sm tracking-wide rounded py-2 hover:bg-[#6f3f56] transition-colors duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
