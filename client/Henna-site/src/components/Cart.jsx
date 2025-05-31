import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { CartContext } from "./CartContext";

export default function Cart() {
  const { cartItems, updateQuantity, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 850, once: true });
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#e6f7e2] min-h-screen px-10 md:px-20 py-3 flex flex-col scroll-smooth">
      <Header />
      <main className="flex-grow p-8 md:p-20">
        <h1
          className="text-3xl font-bold text-[#5a6341] mb-8"
          data-aos="fade-down"
        >
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-600" data-aos="fade-up">
            Your cart is empty.
          </p>
        ) : (
          <>
            <table
              className="w-full mb-8 text-left border-collapse"
              data-aos="fade-up"
            >
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Price</th>
                  <th className="pb-2">Quantity</th>
                  <th className="pb-2">Total</th>
                  <th className="pb-2">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id || item.id} className="border-b border-gray-200">
                    <td className="py-4 flex items-center gap-4">
                      <img
                        src={item.image || "https://via.placeholder.com/50"}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      {item.title}
                    </td>
                    <td className="py-4"> {item.price}</td>
                    <td className="py-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item._id || item.id, Number(e.target.value))
                        }
                        className="w-16 border rounded px-2 py-1"
                      />
                    </td>
                    <td className="py-4"> {item.price * item.quantity}</td>
                    <td className="py-4">
                      <button
                        onClick={() => removeItem(item._id || item.id)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              className="text-right"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="text-xl font-semibold text-[#5a6341]">
                Subtotal: {subtotal}
              </p>
              <button
                className="mt-4 bg-[#7b845b] text-white px-6 py-3 rounded hover:bg-[#5a6341] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => navigate("/checkout", { state: { cartItems } })}
                disabled={cartItems.length === 0}
              >
                Buy Now
              </button>

            </div>
          </>
        )}
      </main>
    </div>
  );
}
