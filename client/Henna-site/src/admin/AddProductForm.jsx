import React, { useState } from 'react';

export default function AddProductForm() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = { title, price, image };

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      setMessage('Product added!');
      setTitle('');
      setPrice('');
      setImage('');
    } else {
      setMessage('Failed to add product.');
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#FBE4DB] p-6 sm:p-10 rounded-2xl shadow-xl"
      >
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 text-center text-[#854F6C]">
          Add New Product
        </h3>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 sm:p-4 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-3 sm:p-4 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full p-3 sm:p-4 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-full sm:w-auto px-6 py-4 bg-[#854F6C] hover:bg-[#6b3c55] text-white font-semibold rounded-full transition-all duration-300 shadow-md block mx-auto text-center"
        >
          Add Product
        </button>

        {message && (
          <p className="mt-8 text-center text-base sm:text-lg text-[#854F6C] font-medium">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
