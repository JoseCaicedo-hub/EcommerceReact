import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cartData");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error al cargar carrito desde localStorage:", error);
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem("cartData", JSON.stringify(cart));
    } catch (error) {
      console.error("Error al guardar carrito en localStorage:", error);
    }
  }, [cart]);

  const addToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === productToAdd.id &&
          item.product.size === productToAdd.size &&
          item.product.color === productToAdd.color
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += productToAdd.quantity; // Suma la cantidad existente con la nueva
        return updatedCart;
      } else {
        return [
          ...prevCart,
          { product: productToAdd, quantity: productToAdd.quantity }, // Usa la cantidad pasada
        ];
      }
    });
  };

  const removeFromCart = (productId, productSize, productColor) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.product.id === productId &&
            item.product.size === productSize &&
            item.product.color === productColor)
      )
    );
  };

  const updateQuantity = (productId, productSize, productColor, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId &&
        item.product.size === productSize &&
        item.product.color === productColor
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    if (window.confirm("¿Seguro que quieres vaciar el carrito?")) {
      setCart([]);
      localStorage.removeItem("cartData");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
