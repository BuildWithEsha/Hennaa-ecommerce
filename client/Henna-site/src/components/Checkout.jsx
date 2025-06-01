import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];

  const [form, setForm] = useState({
    email: "",
    phone: "",
    country: "",
    city: "",
    address: "",
    houseNo: "",
    postalCode: "",
    firstName: "",
    lastName: "",
    shippingMethod: "Standard",
    paymentMethod: "Cash on Delivery",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/order-complete", {
      state: {
        orderNo: Math.floor(100000 + Math.random() * 900000),
        cartItems,
        form,
      },
    });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 260;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#e6f7e2] p-4 md:p-20 pt-6">
      <h1 className="text-3xl font-bold text-[#5a6341] mt-4 mb-8 text-center">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-10">
        <div className="text-[#5a6341] space-y-4 self-start w-full">
          <h2 className="text-2xl font-bold mb-2">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item._id || item.id} className="flex items-center gap-4">
              <img
                src={item.image || "https://via.placeholder.com/80"}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">
                  {item.quantity} × {item.price}
                </p>
              </div>
            </div>
          ))}

          <hr className="my-6 border-gray-300" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{total}</span>
            </div>
          </div>
        </div>

        <div className="max-h-[65vh] overflow-y-auto bg-white p-6 rounded-lg shadow-xl shadow-[#5a6341] border border-[#6f775b] w-full">
          <form onSubmit={handleSubmit} className="space-y-5 text-[#5a6341]">
            {[
              ["firstName", "First Name"],
              ["lastName", "Last Name"],
              ["email", "Email", "email"],
              ["phone", "Phone", "tel"],
              ["country", "Country"],
              ["city", "City"],
              ["address", "Address"],
              ["houseNo", "House No"],
              ["postalCode", "Postal Code"],
            ].map(([name, label, type = "text"]) => (
              <div key={name}>
                <label className="block mb-1 font-semibold" htmlFor={name}>
                  {label}
                </label>
                <input
                  required
                  type={type}
                  id={name}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}

            <div>
              <label className="block mb-1 font-semibold" htmlFor="shippingMethod">
                Shipping Method
              </label>
              <select
                id="shippingMethod"
                name="shippingMethod"
                value={form.shippingMethod}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Standard">Standard (+260)</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-semibold" htmlFor="paymentMethod">
                Payment Method
              </label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-[#7b845b] text-white py-3 rounded hover:bg-[#5a6341] transition"
            >
              Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
