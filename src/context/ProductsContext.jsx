import { createContext, useState } from "react";
import { recieveProducts } from "../utilits/Farebase";

export const ProductContext = createContext({
  products: [],
  recieveProductsHandler: () => {},
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const recieveProductsHandler = async (url) => {
    setProducts([]);

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
