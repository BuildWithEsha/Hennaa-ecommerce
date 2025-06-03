import React, { useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTrashAlt } from 'react-icons/fa';

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderIds, setExpandedOrderIds] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  async function toggleDelivered(id, currentStatus) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delivered: !currentStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) =>
          prev.map((order) =>
            order._id === id ? updated : order
          )
        );
      } else {
        console.error('Failed to update delivery status');
      }
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  }

  function toggleDetails(id) {
    setExpandedOrderIds(prev =>
      prev.includes(id)
        ? prev.filter(orderId => orderId !== id)
        : [...prev, id]
    );
  }

  // Persistent delete: call backend API to delete, then update frontend state
  async function deleteOrder(id) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setOrders(prev => prev.filter(order => order._id !== id));
        setExpandedOrderIds(prev => prev.filter(orderId => orderId !== id));
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  }

  const toBeDelivered = orders.filter((o) => !o.delivered);
  const delivered = orders.filter((o) => o.delivered);

  function renderOrderDetails(order) {
    return (
      <div className="mt-2 text-sm text-[#854F6C]">
        <p><strong>Email:</strong> {order.form.email}</p>
        <p><strong>Phone:</strong> {order.form.phone}</p>
        <p><strong>Address:</strong> {order.form.houseNo}, {order.form.address}, {order.form.city}, {order.form.country}, {order.form.postalCode}</p>
        <p><strong>Shipping:</strong> {order.form.shippingMethod}</p>
        <p><strong>Payment:</strong> {order.form.paymentMethod}</p>
        <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
        <p><strong>Product Details:</strong></p>
        <ul className="pl-4 list-disc">
          {order.cartItems.map((item, index) => (
            <li key={index}>
              {item.title} (Qty: {item.quantity}) - {item.price}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function OrderItem({ order, isDelivered }) {
    const isExpanded = expandedOrderIds.includes(order._id);
    return (
      <li className={`p-4 rounded-2xl shadow-md border border-[#DFB6B2] ${isDelivered ? 'bg-[#DFB6B2]' : 'bg-[#FBE4DB]'} flex flex-col justify-between`}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[#854F6C]"><strong>Order ID:</strong> {order.orderNo}</p>
            <p className="text-[#854F6C]"><strong>Customer:</strong> {order.form.firstName} {order.form.lastName}</p>
            <p className="text-[#854F6C]"><strong>Products:</strong> {order.cartItems.map(p => p.title).join(', ')}</p>
            {isExpanded && renderOrderDetails(order)}
          </div>
          <div className="flex flex-col items-center space-y-1">
            <button
              onClick={() => toggleDetails(order._id)}
              className="text-[#854F6C] hover:text-black"
              title="Toggle Details"
            >
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <button
              onClick={() => deleteOrder(order._id)}
              className="text-[#854F6C] hover:text-red-600"
              title="Delete Order"
              style={{ fontSize: '0.75rem', lineHeight: 1 }}
              aria-label="Delete order"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
        <button
          onClick={() => toggleDelivered(order._id, order.delivered)}
          className={`mt-auto self-end px-4 py-1.5 rounded-full text-white text-sm font-medium transition-all
            ${isDelivered ? 'bg-gray-500 hover:bg-gray-600' : 'bg-[#854F6C] hover:bg-[#6b3c55]'}`}
        >
          {isDelivered ? 'Mark as Undelivered' : 'Mark as Delivered'}
        </button>
      </li>
    );
  }

  return (
    <div className="px-6 py-8">
      <section className="mb-10">
        <h4 className="text-2xl font-bold tracking-widest text-[#854F6C] border-b-4 border-[#DFB6B2] pb-2 mb-6 uppercase">
          To Be Delivered
        </h4>
        {toBeDelivered.length === 0 && <p className="text-[#854F6C]">No pending orders.</p>}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toBeDelivered.map((order) => (
            <OrderItem key={order._id} order={order} isDelivered={false} />
          ))}
        </ul>
      </section>

      <section>
        <h4 className="text-2xl font-bold tracking-widest text-[#854F6C] border-b-4 border-[#DFB6B2] pb-2 mb-6 uppercase">
          Delivered Orders
        </h4>
        {delivered.length === 0 && <p className="text-[#854F6C]">No delivered orders yet.</p>}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {delivered.map((order) => (
            <OrderItem key={order._id} order={order} isDelivered={true} />
          ))}
        </ul>
      </section>
    </div>
  );
}
