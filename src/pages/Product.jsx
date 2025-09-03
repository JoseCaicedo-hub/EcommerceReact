import React, { useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  // Estados para talla y color
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad

  if (!product) return <p>Producto no encontrado</p>;

  const handleAddToCart = () => {
    if (!size || !color || quantity < 1) {
      alert("Por favor selecciona una talla, un color y una cantidad válida");
      return;
    }
    addToCart({ ...product, size, color, quantity }); // Pasa la cantidad
  };

  return (
    <main style={{ maxWidth: 600, margin: "2rem auto" }}>
      <img
        src={product.urlImage}
        alt={product.name}
        style={{ width: "80%", borderRadius: 12, objectFit: "cover" }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "1rem",
        }}
      >
        <h1 style={{ margin: 0 }}>{product.name}</h1>
        <p style={{ margin: 0, fontSize: "1rem", color: "#555" }}>
          {product.description}
        </p>
        <p style={{ margin: 0, fontWeight: "700", fontSize: "1.3rem" }}>
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Selector de Talla */}
      <div style={{ marginTop: "1rem" }}>
        <label style={{ fontWeight: "bold" }}>Talla:</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Selecciona</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>

      {/* Selector de Color */}
      <div style={{ marginTop: "1rem" }}>
        <label style={{ fontWeight: "bold" }}>Color:</label>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{
            marginLeft: "10px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Selecciona</option>
          <option value="Blanco">Blanco</option>
          <option value="Negro">Negro</option>
          <option value="Azul">Azul</option>
          <option value="Rojo">Rojo</option>
        </select>
      </div>

      {/* Selector de Cantidad */}
      <div style={{ marginTop: "1rem" }}>
        <label style={{ fontWeight: "bold" }}>Cantidad:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
          min="1"
          style={{
            marginLeft: "10px",
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "60px",
            textAlign: "center",
          }}
        />
      </div>

      <button
        onClick={handleAddToCart}
        style={{
          margin: "35px 0",
          padding: "15px 20px",
          backgroundColor: "#999999",
          color: "white",
          border: "none",
          borderRadius: 10,
          cursor: "pointer",
          fontWeight: "500",
          transition: "background-color 0.3s ease",
        }}        
      >
        Agregar al carrito
      </button>
    </main>
  );
}
