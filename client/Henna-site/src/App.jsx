import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import ScrollToHashElement from "./components/ScrollToHashElement";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderComplete from "./components/OrderComplete";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./admin/AuthContext";
import  ProtectedRoute  from "./admin/ProtectedRoute"

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToHashElement />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-complete" element={<OrderComplete />} />

            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
