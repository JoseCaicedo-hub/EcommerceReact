import { useEffect, useState } from "react";
import { getProducts } from "../api/products";


export const useProducts = () => {
  // creación de estados de la solicitud
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // llamado a mi función de API
  const getProductos = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getProducts();
      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  return { data, loading, error, getProductos };
};
