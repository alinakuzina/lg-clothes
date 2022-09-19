import { useContext } from "react";
import { ProductContext } from "../../context/ProductsContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Shop.scss";

const Shop = () => {
  const { products } = useContext(ProductContext);
  console.log(products);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.code} product={product}></ProductCard>
      ))}
    </div>
  );
};

export default Shop;
