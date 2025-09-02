import React, { useState, useEffect } from 'react';
import './ProductCarousel.css';
import products from '../data/carouselProducts'; // Importar los productos del carrusel

const ProductCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia la imagen cada 5 segundos (5000 ms)

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, [products.length]); // Se ejecuta cada vez que cambia la longitud de los productos

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="product-carousel">
      <button className="carousel-button prev" onClick={prevImage}>&#10094;</button>
      <div className="carousel-content">
        <img
          src={products[currentImageIndex].image}
          alt={products[currentImageIndex].name}
          className="carousel-image"
        />
        <div className="carousel-text-overlay">
          <h2>{products[currentImageIndex].name}</h2>
          <p>{products[currentImageIndex].description}</p>
          <button className="carousel-shop-button">Comprar ahora</button>
        </div>
      </div>
      <button className="carousel-button next" onClick={nextImage}>&#10095;</button>
    </div>
  );
};

export default ProductCarousel;
