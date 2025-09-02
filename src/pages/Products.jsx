import React from "react";
import ProductList from "../components/ProductList";
import ProductCarousel from "../components/ProductCarousel";
import products from "../data/products";

export default function Products() {
  return (
    <main style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 1rem" }}>
      <ProductCarousel />
      <ProductList products={products} />
    </main>
  );
}
