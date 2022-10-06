import { useEffect, useReducer } from "react";
import React from "react";

import { createUserDocumentFromAuth, database } from "../utilits/Farebase";
import { onAuthStateChangeListener } from "../utilits/Farebase";
import { categoriesArray } from "../utilits/Categories";

export const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: () => {},
  categories: [],
});

const INITIAL_STATE = {
  currentUser: null,
};

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type}`);
  }
};

const ContextProvider = (props) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, currentUser: user });
  };
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        setCurrentUser: setCurrentUser,
        currentUser: currentUser,
        categories: categoriesArray,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
