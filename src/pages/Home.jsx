import products from "../data/products";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}
