import React, { useState } from 'react';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import OrderList from './OrderList';
import ChangePasswordForm from './ChangePasswordForm';

export default function AdminDashboard() {
  const [view, setView] = useState('list');

  const navButtons = [
    { id: 'list', label: 'View Products' },
    { id: 'add', label: 'Add Product' },
    { id: 'orders', label: 'Manage Orders' },
    { id: 'changePassword', label: 'Change Password' },
  ];

  return (
    <div
      className="min-h-screen px-4 py-8 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #FBE4DB, #DFB6B2, #854F6C)',
      }}
    >
      <h1
        className="text-center font-extrabold text-3xl sm:text-4xl lg:text-5xl mt-8 mb-12 tracking-wide"
        style={{
          color: '#854F6C',
          textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        Admin Dashboard
      </h1>

      <nav className="max-w-3xl mx-auto mb-12 bg-white/80 p-4 rounded-xl shadow-md">
        <div className="grid grid-cols-2 gap-4 md:flex md:justify-center">
          {navButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setView(btn.id)}
              className={`w-full md:w-auto px-4 py-3 text-sm sm:text-base rounded-lg font-semibold transition-colors duration-300 ${
                view === btn.id
                  ? 'bg-[#854F6C] text-white'
                  : 'bg-white text-[#854F6C]'
              } hover:bg-[#854F6C] hover:text-white shadow`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="px-2 sm:px-4">
        {view === 'list' && <ProductList />}
        {view === 'add' && <AddProductForm />}
        {view === 'orders' && <OrderList />}
        {view === 'changePassword' && <ChangePasswordForm />}
      </main>
    </div>
  );
}
