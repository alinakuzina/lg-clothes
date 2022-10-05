import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductsContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import style from "./ShopPage.module.scss";
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
    <div className={style.products_page_container}>
      <div className={style.subcategories}>
        {categories
          .filter((el) => el.tagCode === currentCategory)[0]
          ?.subCategories.map((category) => (
            <div
              className={`${style.link_sub_category} ${
                category.tagCode === url ? style.category_selected : ""
              }`}
              id={category.tagCode}
              onClick={redirectToPage}
              key={category.tagCode + Math.random()}
            >
              {category.catName}
            </div>
          ))}
      </div>

      <div className={style.products_container}>
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
