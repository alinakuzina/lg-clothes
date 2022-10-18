import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import style from "./ShopPage.module.scss";
import { useEffect } from "react";
import { selectCategories } from "../../store/Categories/CategoriesSelector";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  isLoadingProducts,
  errorProducts,
} from "../../store/Products/ProductsSelector";
import { fetchProductsData } from "../../store/Products/ProductsAction";
import Loader from "../Loader/Loade";

const ShopPage = ({ url }) => {
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingProducts);
  const error = useSelector(errorProducts);

  let navigate = useNavigate();
  let redirectToPage = (e) => {
    let link = e.target.id;
    let firstPartLink = link.split("_")[0];
    navigate(`/${firstPartLink}/${link}`);
  };

  useEffect(() => {
    dispatch(fetchProductsData(url));
    window.scrollTo(0, 0);
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
      {isLoading && (
        <div className={style.loader_container}>
          <Loader />
        </div>
      )}
      {error && (
        <p>
          Something went wrong. Please check your internet connection and try
          again.
        </p>
      )}
      {!isLoading && (
        <div className={style.products_container}>
          {products.map((product) => (
            <ProductCard
              key={product.code + Math.random()}
              product={product}
            ></ProductCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopPage;
