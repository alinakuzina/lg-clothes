import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import style from "./ShopPage.module.scss";
import { useEffect } from "react";
import { selectCategories } from "../../store/Categories/CategoriesSelector";
import { useDispatch, useSelector } from "react-redux";
import { productsActions } from "../../store/Products/ProductsReducer";
import { selectProducts } from "../../store/Products/ProductsSelector";
import { recieveProducts } from "../../utilits/Farebase";
const ShopPage = ({ url }) => {
  const products = useSelector(selectProducts);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  let redirectToPage = (e) => {
    let link = e.target.id;
    navigate(`/${link}`);
  };

  useEffect(() => {
    let recieveProductsFromBase = async () => {
      let newProducts = await recieveProducts(url);
      if (newProducts.length > 0) {
        newProducts.forEach((el) => {
          if (el.variantSizes.length === 0) {
            el.variantSizes.push({ filterCode: "one size", orderFilter: 1 });
          }
        });
        dispatch(productsActions.recieveProducts({ products: newProducts }));
      } else {
        console.log("No such document!");
      }
    };
    recieveProductsFromBase();
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
