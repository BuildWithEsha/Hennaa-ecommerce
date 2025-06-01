import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function OrderComplete() {
  const location = useLocation();
  const { orderNo, cartItems, form } = location.state || {};

  useEffect(() => {
    if (!orderNo || !cartItems || !form) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderNo, cartItems, form }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Order saved:", data);
      })
      .catch((err) => {
        console.error("Error saving order:", err);
      });
  }, [orderNo, cartItems, form]);

  if (!orderNo) {
    return <p>No order data found.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e6f7e2] p-8 md:p-20">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-lg text-center">
        <h1 className="text-3xl font-bold text-[#5a6341] mb-4">Order Complete!</h1>
        <p className="text-lg mb-6">Thank you for your purchase.</p>
        <p className="text-xl font-semibold text-[#7b845b]">Your order number is:</p>
        <p className="text-2xl font-bold text-[#5a6341]">{orderNo}</p>

        <h2 className="mt-6 mb-2 font-semibold text-[#5a6341] text-lg">Order Summary:</h2>
        {cartItems.map((item) => (
          <div key={item._id || item.id} className="flex items-center gap-4 justify-center">
            <img
              src={item.image || "https://via.placeholder.com/80"}
              alt={item.title}
              className="w-20 h-20 m-4 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} × {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
