import { useSelector } from "react-redux";
import style from "./FavoritesPage.module.scss";
import { selectFavoritesProducts } from "../../store/Products/ProductsSelector";
import ProductCard from "../ProductCard/ProductCard";

const FavoritesPage = () => {
  const favorites = useSelector(selectFavoritesProducts);
  return (
    <div className={style.favorite_page_container}>
      <div className={style.products_container}>
        {favorites.map((product) => (
          <ProductCard product={product} key={product.articleCodes[0]} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
