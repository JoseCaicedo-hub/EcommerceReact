import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Leer el usuario desde localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const username = storedUser?.username || "invitado";

  if (cart.length === 0) {
    return (
      <main style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: "1.1rem",
            fontWeight: 500,
            color: "#444",
            lineHeight: "1.6",
            letterSpacing: "0.5px",
            textAlign: "justify"
          }}
        >Tu carrito está vacío, {username}</p>
        <button className="volver-btn">
        <Link to="/" >
          Volver a la tienda
        </Link>
        </button>
      </main>
    );
  }

  return (  
    <main style={{ maxWidth: 500, margin: "2rem auto" }}>
      <p   style={{
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            fontSize: "1.1rem",
            fontWeight: 500,
            color: "#444",
            lineHeight: "1.6",
            letterSpacing: "0.5px",
            textAlign: "justify"
          }}
            >Carrito de {username}</p>
      {cart.map(({ product, quantity }) => (
        <div
          key={`${product.id}-${product.size}-${product.color}`}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "2rem 0",
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: "700" }}>{product.name}</p>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>Talla: {product.size}</p>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>Color: {product.color}</p>
            <p>${product.price.toFixed(2)}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={() => updateQuantity(product.id, product.size, product.color, quantity - 1)}
              style={{
                padding: "0.4rem 0.8rem",
                fontWeight: "700",
                cursor: "pointer",
              }}
              aria-label={`Disminuir cantidad de ${product.name}`}
            >
              -
            </button>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val > 0) updateQuantity(product.id, product.size, product.color, val);
              }}
              style={{ width: "40px", textAlign: "center" }}
              aria-label={`Cantidad de ${product.name}`}
            />
            <button
              onClick={() => updateQuantity(product.id, product.size, product.color, quantity + 1)}
              style={{
                padding: "0.4rem 0.8rem",
                fontWeight: "700",
                cursor: "pointer",
              }}
              aria-label={`Aumentar cantidad de ${product.name}`}
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(product.id, product.size, product.color)}
            style={{
              background: "none",
              border: "none",
              color: "#dc2626",
              fontWeight: "700",
              cursor: "pointer",
            }}
            aria-label={`Eliminar ${product.name} del carrito`}
          >
            Eliminar
          </button>
        </div>
      ))}
    </main>
  );
}
