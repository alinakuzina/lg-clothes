import { createSlice } from "@reduxjs/toolkit";
import {
  addItemToArray,
  removeItemFromArray,
  reduceItemQuantityinArray,
} from "./CartHelperFunctions";

const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  itemsCount: 0,
  totalPrice: "3.50",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    addItemToCart(state, action) {
      //new items count
      state.itemsCount++;
      //new totalPrice
      state.totalPrice = (
        Number(state.totalPrice) +
        Number(action.payload.productToAdd.price.value)
      ).toFixed(2);
      //new cartItems
      state.cartItems = addItemToArray(
        state.cartItems,
        action.payload.productToAdd,
        action.payload.size
      );
    },
    removeItem(state, action) {
      console.log(action);
      //update itemsCount
      state.itemsCount = state.itemsCount - action.payload.item.quantity;
      //updates totalPrice
      let priceOfSelectedItems =
        action.payload.item.quantity * action.payload.item.price.value;
      state.totalPrice = (
        Number(state.totalPrice) - Number(priceOfSelectedItems)
      ).toFixed(2);
      // remove item from array
      state.cartItems = removeItemFromArray(
        state.cartItems,
        action.payload.item
      );
    },
    reduceItemQuantity(state, action) {
      state.itemsCount--;
      state.totalPrice = (
        Number(state.totalPrice) - Number(action.payload.item.price.value)
      ).toFixed(2);
      state.cartItems = reduceItemQuantityinArray(
        state.cartItems,
        action.payload.item
      );
    },
  },
});

export const cartActions = cartSlice.actions;
