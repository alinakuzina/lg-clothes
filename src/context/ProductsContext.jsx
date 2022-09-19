import { createContext, useState } from "react";

import { items } from "../components/temporary-items/items-temporary";

export const ProductContext = createContext({ products: [] });
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(items.results);

  return (
    <ProductContext.Provider value={{ products: products }}>
      {children}
    </ProductContext.Provider>
  );
};
