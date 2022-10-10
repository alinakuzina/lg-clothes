import { createContext, useReducer } from "react";
import { createAction } from "../utilits/Reducer";

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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, ...payload };
    default:
      throw new Error(`unhandaled type in cart reducer ${type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, itemsCount, totalPrice }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItems = (newCartItems, newItemsCount, newTotalPrice) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        itemsCount: newItemsCount,
        totalPrice: newTotalPrice,
      })
    );
  };

  const setIsCartOpen = () => {
    let isOpen = !isCartOpen;
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, { isCartOpen: isOpen })
    );
  };

  const addItemToCart = (productToAdd, size) => {
    let newItemsCount = itemsCount + 1;

    let newPrice = Number(totalPrice) + Number(productToAdd.price.value);
    let newTotalPrice = newPrice.toFixed(2);

    let newCartItems;

    if (cartItems.length === 0) {
      newItemsCount = 1;
      newCartItems = [{ ...productToAdd, ectedSize: size }];
    }

    let findElement = cartItems.find((el) => {
      return (
        el.articles[0].code === productToAdd.articles[0].code &&
        el.selectedSize === size
      );
    });

    if (!findElement) {
      newCartItems = [
        ...cartItems,
        { ...productToAdd, quantity: 1, selectedSize: size },
      ];
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
      newCartItems = newArr;
    }
    updateCartItems(newCartItems, newItemsCount, newTotalPrice);
  };

  const removeItem = (item) => {
    let newItemsCount = itemsCount - item.quantity;
    let priceOfSelectedItems = item.quantity * item.price.value;
    let newPrice = Number(totalPrice) - Number(priceOfSelectedItems);
    let newTotalPrice = newPrice.toFixed(2);
    let index = cartItems.indexOf(item);
    let newArr = cartItems.filter((el, indexEl) => indexEl !== index);
    let newCartItems = newArr;
    updateCartItems(newCartItems, newItemsCount, newTotalPrice);
  };

  const reduceItemQuantity = (item) => {
    if (item.quantity === 1) {
      removeItem(item);
      return;
    }

    let newItemsCount = itemsCount - 1;
    let newTotal = Number(totalPrice) - Number(item.price.value);
    let newTotalPrice = newTotal.toFixed(2);

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

    let newCartItems = newArr;
    updateCartItems(newCartItems, newItemsCount, newTotalPrice);
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
