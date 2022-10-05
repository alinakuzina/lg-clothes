import { createContext, useState } from "react";
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { database } from "../utilits/Farebase";

export const ProductContext = createContext({
  products: [],
  recieveProductsHandler: () => {},
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const recieveProductsHandler = async (url) => {
    setProducts([]);

    const docRef = doc(database, "products", url);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let newProducts = [];
      for (let key in docSnap.data()) {
        newProducts.push(docSnap.data()[key]);
      }

      setProducts(newProducts);
    } else {
      console.log("No such document!");
    }
  };

  //if there are no sizes we cannot choose this product. So we add 'one size' to this size to fix it.
  products.forEach((el) => {
    console.log(el.variantSizes);
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
