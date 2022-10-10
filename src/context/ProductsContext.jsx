import { useReducer } from "react";
import { createContext } from "react";
import { recieveProducts } from "../utilits/Farebase";
import { createAction } from "../utilits/Reducer";

export const ProductContext = createContext({
  products: [],
  recieveProductsHandler: () => {},
});

const PRODUCTS_INITIAL_STATE = {
  products: [],
};

export const PRODUCTS_ACTION_TYPES = {
  RECIEVE_PRODUCTS: "RECIEVE_PRODUCTS",
};

const productsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCTS_ACTION_TYPES.RECIEVE_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    default:
      throw new Error(`Not correct action in Product context ${type}`);
  }
};

export const ProductsProvider = ({ children }) => {
  const [{ products }, dispatch] = useReducer(
    productsReducer,
    PRODUCTS_INITIAL_STATE
  );

  const setProducts = (products) => {
    dispatch(createAction(PRODUCTS_ACTION_TYPES.RECIEVE_PRODUCTS, products));
  };

  const recieveProductsHandler = async (url) => {
    let newProducts = await recieveProducts(url);
    if (newProducts.length > 0) {
      setProducts(newProducts);
    } else {
      console.log("No such document!");
    }
  };

  //if there are no sizes we cannot choose this product. So we add 'one size' to this size to fix it.
  products.forEach((el) => {
    if (el.variantSizes.length === 0) {
      el.variantSizes.push({ filterCode: "one size", orderFilter: 1 });
    }
  });

  return (
    <ProductContext.Provider
      value={{
        products: products,
        recieveProductsHandler: recieveProductsHandler,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
