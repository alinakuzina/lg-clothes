import { useContext } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  itemsCount: 0,
  removeItem: () => {},
  reduceItemQuantity: () => {},
  totalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (productToAdd, size) => {
    setItemsCount((prev) => prev + 1);
    setTotalPrice((prev) => {
      let newPrice = Number(prev) + Number(productToAdd.price.value);
      return newPrice.toFixed(2);
    });

    if (cartItems.length === 0) {
      setCartItems([{ ...productToAdd, quantity: 1, selectedSize: size }]);
    }

    let findElement = cartItems.find((el) => {
      return (
        el.articles[0].code === productToAdd.articles[0].code &&
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
        cartItem.articles[0].code === productToAdd.articles[0].code &&
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

  const removeItem = (item) => {
    setItemsCount((prev) => prev - item.quantity);
    let priceOfSelectedItems = item.quantity * item.price.value;
    setTotalPrice((prev) => {
      let newPrice = Number(prev) - Number(priceOfSelectedItems);
      return newPrice.toFixed(2);
    });
    let index = cartItems.indexOf(item);
    let newArr = cartItems.filter((el, indexEl) => indexEl !== index);
    console.log(newArr);
    setCartItems(newArr);
  };

  const reduceItemQuantity = (item) => {
    if (item.quantity === 1) {
      removeItem(item);
      return;
    }

    setItemsCount((prev) => prev - 1);

    setTotalPrice((prev) => {
      let newTotal = Number(prev) - Number(item.price.value);
      return newTotal.toFixed(2);
    });

    let newArr = cartItems.map((cartItem) => {
      if (
        cartItem.articles[0].code === item.articles[0].code &&
        cartItem.selectedSize === item.selectedSize
      ) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
          selectedSize: cartItem.selectedSize,
        };
      } else {
        return cartItem;
      }
    });

    setCartItems(newArr);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    itemsCount,
    removeItem,
    reduceItemQuantity,
    totalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
