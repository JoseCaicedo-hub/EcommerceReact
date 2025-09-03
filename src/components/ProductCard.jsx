import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Estado para manejar la calificación
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="product-card">
      <img src={product.urlImage} alt={product.name} draggable={false} />
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="price">${product.price.toFixed(2)}</p>

      {/* Estrellas interactivas */}
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{
              cursor: "pointer",
              color: star <= (hover || rating) ? "#FFD700" : "#ccc",
              fontSize: "1.5rem",
              transition: "color 0.2s",
            }}
          >
            ★
          </span>
        ))}
      </div>

      <div className="buttons">
        <button onClick={() => navigate(`/product/${product.id}`)}>
          Ver detalles
        </button>
        <button onClick={() => addToCart(product)}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
