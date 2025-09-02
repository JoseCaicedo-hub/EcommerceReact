import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import MainChatBot from "./components/MainChatBot";
import LoginRegister from "./components/LoginRegister";
import { Outlet } from "react-router-dom"; // si usas rutas anidadas



export default function App() {
  const [showChatBot, setShowChatBot] = useState(false);

  const toggleChatBot = () => setShowChatBot(prev => !prev);

  return (
    <div>
      <CartProvider>
        <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
          <Routes>
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <main style={{ flex: 1, padding: "1rem" }}>
            <Outlet /> {/* Aquí se renderiza el contenido de cada página */}
          </main>
          <Footer />
        </div>
        </Router>

        {/* Botón flotante */}
        <button
          onClick={toggleChatBot}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "20px",
            zIndex: 1000,
            backgroundColor: "#999999",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            cursor: "pointer",
            fontSize: "30px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
          aria-label="Toggle ChatBot"
          title="Chat"
        >
          💬
        </button>

        {/* Mostrar chatbot si showChatBot es true */}
        {showChatBot && (
          <div
            style={{
              position: "fixed",
              bottom: "80px",
              left: "30px",
              zIndex: 1000,
              width: "300px",
              height: "500px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              backgroundColor: "white",
              borderRadius: "10px"
            }}
          >
            <MainChatBot />
          </div>
        )}
      </CartProvider>
    </div>
  );
}
