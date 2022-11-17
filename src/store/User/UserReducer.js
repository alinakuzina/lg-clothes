import { createSlice } from "@reduxjs/toolkit";
import { addNewOrderToBase } from "../../utilits/Farebase";

const USER_INITIAL_STATE = {
  currentUser: null,
  orders: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload.user;
      if (state.orders.length) {
        state.orders = action.payload.orders;
      }
      if (action.payload.orders.length > 0) {
        state.orders = action.payload.orders;
      }
    },
    addOrder(state, action) {
      state.orders.push(action.payload.order);
      console.log([...state.orders, action.payload.order]);
      addNewOrderToBase(state.currentUser.uid, action.payload.order);
    },
    signOut(state, action) {
      state.currentUser = null;
      state.orders = [];
    },
  },
});

export const userActions = userSlice.actions;
