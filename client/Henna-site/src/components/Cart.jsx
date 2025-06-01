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
    <div className="bg-[#e6f7e2] min-h-screen px-4 sm:px-8 md:px-20 py-3 flex flex-col scroll-smooth">
      <Header />
      <main className="flex-grow p-4 sm:p-8 md:p-20">
        <h1
          className="text-2xl sm:text-3xl font-bold text-[#5a6341] mb-6 sm:mb-8"
          data-aos="fade-down"
        >
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-base sm:text-lg text-gray-600" data-aos="fade-up">
            Your cart is empty.
          </p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto" data-aos="fade-up">
              <table className="w-full min-w-[600px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="pb-2 text-left px-2">Product</th>
                    <th className="pb-2 text-left px-2">Price</th>
                    <th className="pb-2 text-left px-2">Quantity</th>
                    <th className="pb-2 text-left px-2">Total</th>
                    <th className="pb-2 text-left px-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr
                      key={item._id || item.id}
                      className="border-b border-gray-200"
                    >
                      <td className="py-4 flex items-center gap-4 px-2 min-w-[200px]">
                        <img
                          src={item.image || "https://via.placeholder.com/50"}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded flex-shrink-0"
                        />
                        <span className="truncate">{item.title}</span>
                      </td>
                      <td className="py-4 px-2 whitespace-nowrap">
                        {item.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item._id || item.id,
                              Math.max(1, Number(e.target.value))
                            )
                          }
                          className="w-16 border rounded px-2 py-1"
                          aria-label={`Quantity for ${item.title}`}
                        />
                      </td>
                      <td className="py-4 px-2 whitespace-nowrap">
                        {(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 px-2 whitespace-nowrap">
                        <button
                          onClick={() => removeItem(item._id || item.id)}
                          className="text-red-600 hover:underline"
                          aria-label={`Remove ${item.title} from cart`}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden flex flex-col gap-6" data-aos="fade-up">
              {cartItems.map((item) => (
                <div
                  key={item._id || item.id}
                  className="rounded-lg shadow p-4 flex flex-col gap-3 "
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "https://via.placeholder.com/50"}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <h2 className="text-lg font-semibold text-[#5a6341] truncate">
                      {item.title}
                    </h2>
                  </div>
                  <div className="flex justify-between text-sm text-gray-700">
                    <span>Price:</span>
                    <span>{item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-700">
                    <label htmlFor={`qty-${item._id || item.id}`}>
                      Quantity:
                    </label>
                    <input
                      id={`qty-${item._id || item.id}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item._id || item.id,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                      className="w-16 border rounded px-2 py-1"
                      aria-label={`Quantity for ${item.title}`}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-700 font-semibold">
                    <span>Total:</span>
                    <span>{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => removeItem(item._id || item.id)}
                    className="text-red-600 hover:underline self-start mt-2"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div
              className="text-right mt-6 sm:mt-10"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p className="text-lg sm:text-xl font-semibold text-[#5a6341]">
                Subtotal: {subtotal.toFixed(2)}
              </p>
              <button
                className="mt-4 bg-[#7b845b] text-white px-6 py-3 rounded hover:bg-[#5a6341] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
