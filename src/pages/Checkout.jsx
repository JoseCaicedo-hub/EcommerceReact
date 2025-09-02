import React from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  const total = cart.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  if (cart.length === 0) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>No hay productos en el carrito.</p>;
  }

  return (
    <main style={{ maxWidth: 400, margin: "2rem auto" }}>
      <h1>Checkout</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.map(({ product, quantity }) => (
          <li key={product.id} style={{ padding: "0.5rem 0", borderBottom: "1px solid #ddd" }}>
            {product.name} x {quantity} = ${(product.price * quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p style={{ fontWeight: "800", fontSize: "1.2rem", marginTop: "1rem" }}>
        Total: ${total.toFixed(2)}
      </p>
      <button
        onClick={() => {
          alert("Gracias por tu compra!");
          clearCart();
        }}
        style={{
          marginTop: "1rem",
          padding: "0.7rem 1.5rem",
          backgroundColor: "#999999",
          color: "white",
          border: "none",
          borderRadius: 8,
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        Confirmar compra
      </button>
    </main>
  );
}
