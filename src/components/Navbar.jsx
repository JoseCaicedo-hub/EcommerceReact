import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css"; // archivo CSS separado

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Mi E-commerce
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/login" className="nav-link">Login</Link>
        <Link to="/cart" className="nav-link">
          Carrito <span className="cart-badge">{totalItems}</span>
        </Link>
        <Link to="/checkout" className="nav-link">Checkout</Link>
      </div>
    </nav>
  );
}
