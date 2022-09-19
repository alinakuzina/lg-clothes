import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd, size) => {
    if (cartItems.length === 0) {
      setCartItems([{ ...productToAdd, quantity: 1, selectedSize: size }]);
    }

    let findElement = cartItems.find((el) => {
      return (
        el.articles.code === productToAdd.articles.code &&
        el.selectedSize === size
      );
    });

    if (!findElement) {
      setCartItems([
        ...cartItems,
        { ...productToAdd, quantity: 1, selectedSize: size },
      ]);
    } else {
      let newArr = cartItems.map((cartItem) =>
        cartItem.articles.code === productToAdd.articles.code &&
        cartItem.selectedSize === size
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              selectedSize: size,
            }
          : cartItem
      );
      setCartItems(newArr);
    }
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
