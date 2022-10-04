import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductsContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ShopPage.scss";
import { UserContext } from "../../context/UserContext";
import { useEffect } from "react";

const ShopPage = ({ url }) => {
  const { products, recieveProductsHandler } = useContext(ProductContext);
  const { categories } = useContext(UserContext);
  let navigate = useNavigate();
  let redirectToPage = (e) => {
    let link = e.target.id;
    navigate(`/${link}`);
  };

  useEffect(() => {
    recieveProductsHandler(url);
  }, [url]);

  let currentCategory = `${url.split("_")[0]}_new`;
  return (
    <div className="products-page-container">
      <div className="subcategories">
        {categories
          .filter((el) => el.tagCode === currentCategory)[0]
          ?.subCategories.map((category) => (
            <div
              className={`link-sub-category ${category.tagCode===url?'category-selected':''}`}
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
          <ProductCard
            key={product.code + Math.random()}
            product={product}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
