import React, { useState } from 'react';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import OrderList from './OrderList';
import ChangePasswordForm from './ChangePasswordForm'; 

export default function AdminDashboard() {
  const [view, setView] = useState('list'); // 'list' | 'add' | 'orders' | 'changePassword'

  return (
    <div
      className="min-h-screen p-8"
      style={{
        background: 'linear-gradient(135deg, #FBE4DB, #DFB6B2, #854F6C)',
      }}
    >
      <h1
        className="text-center font-extrabold"
        style={{
          color: '#854F6C',
          fontSize: '3rem',
          marginTop: '4rem',
          marginBottom: '4rem',
          letterSpacing: '0.1em',
          textShadow: '1px 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        Admin Dashboard
      </h1>

      <nav
        className="mb-6 flex gap-4 justify-center shadow-lg rounded-md p-4 bg-white/80"
        style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <button
          onClick={() => setView('list')}
          className={`px-4 py-2 rounded ${
            view === 'list' ? 'bg-[#854F6C] text-white' : 'bg-white'
          } shadow-sm hover:bg-[#854F6C] hover:text-white transition-colors duration-300`}
        >
          View Products
        </button>
        <button
          onClick={() => setView('add')}
          className={`px-4 py-2 rounded ${
            view === 'add' ? 'bg-[#854F6C] text-white' : 'bg-white'
          } shadow-sm hover:bg-[#854F6C] hover:text-white transition-colors duration-300`}
        >
          Add Product
        </button>
        <button
          onClick={() => setView('orders')}
          className={`px-4 py-2 rounded ${
            view === 'orders' ? 'bg-[#854F6C] text-white' : 'bg-white'
          } shadow-sm hover:bg-[#854F6C] hover:text-white transition-colors duration-300`}
        >
          Manage Orders
        </button>
        <button
          onClick={() => setView('changePassword')}
          className={`px-4 py-2 rounded ${
            view === 'changePassword' ? 'bg-[#854F6C] text-white' : 'bg-white'
          } shadow-sm hover:bg-[#854F6C] hover:text-white transition-colors duration-300`}
        >
          Change Password
        </button>
      </nav>

      <main>
        {view === 'list' && <ProductList />}
        {view === 'add' && <AddProductForm />}
        {view === 'orders' && <OrderList />}
        {view === 'changePassword' && <ChangePasswordForm />}
      </main>
    </div>
  );
}
