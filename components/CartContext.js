"use client";
import {createContext, useEffect, useState} from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts,setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem('cart')) {
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);
  function addProduct(productId) {
    setCartProducts(prev => [...prev,productId]);
  }
  function removeProduct(productId) {
    setCartProducts((prev) => {
      console.log(prev);
      const pos = prev.indexOf(productId);
      console.log(pos);
      // Changed part
      if (prev.length === 1) ls.removeItem("cart");
      if (pos !== -1) {
        return prev.filter((_, index) => index !== pos);
      }
      return prev;
    });
  }
  function clearCart() {
    setCartProducts([]);
    ls?.setItem('cart', JSON.stringify([]));
  }
  return (
    <CartContext.Provider value={{cartProducts,setCartProducts,addProduct,removeProduct,clearCart}}>
      {children}
    </CartContext.Provider>
  );
}