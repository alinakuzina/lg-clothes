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
