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
    <div
      className="min-h-screen flex items-start justify-center pt-20 p-6"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#FBE4DB] p-10 rounded-2xl shadow-xl"
      >
        <h3 className="text-3xl font-bold mb-8 text-center text-[#854F6C]">Add New Product</h3>

        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full mb-5 p-3 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full mb-5 p-3 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="w-full mb-8 p-3 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
        />

        <button
          type="submit"
          className="w-50 mx-auto block bg-[#854F6C] hover:bg-[#6b3c55] text-white font-semibold py-4 rounded-full transition-all duration-300 shadow-md"
        >
          Add Product
        </button>

        {message && (
          <p className="mt-10 text-center text-base text-[#854F6C] font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}
