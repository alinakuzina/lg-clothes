import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductsContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Shop.scss";
import { UserContext } from "../../context/UserContext";

const Shop = ({ url }) => {
  const { products } = useContext(ProductContext);
  const { categories } = useContext(UserContext);
  let navigate = useNavigate();
  let redirectToPage = (e) => {
    let link = e.target.id;
    navigate(`/${link}`);
  };

  let currentCategory = `${url.split("_")[0]}_all`;
  return (
    <div className="products-page-container">
      <div className="subcategories">
        {categories
          .filter((el) => el.tagCode === currentCategory)[0]
          ?.subCategories.map((category) => (
            <div
              className="link-sub-category"
              id={category.tagCode}
              onClick={redirectToPage}
              key={category.tagCode + Math.random()}
            >
              {category.catName}
            </div>
          ))}
      </div>

      <div className="products-container">
        {products.map((product) => (
          <ProductCard key={product.code} product={product}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Shop;
