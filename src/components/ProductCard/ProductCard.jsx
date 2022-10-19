import style from "./ProductCard.module.scss";
import Button from "../Button/Button";
import btnStyle from "../Button/Button.module.scss";
import { ReactComponent as HeartLogo } from "../../assets/heart.svg";
import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/Cart/CartReducer";
import { productsActions } from "../../store/Products/ProductsReducer";
import { selectFavoritesProducts } from "../../store/Products/ProductsSelector";
import { useSelector } from "react-redux";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [visibleSizes, setVisibleSizes] = useState(false);
  const [isLoadedImg, setIsLoadedImg] = useState(false);
  const [isFavoriteItem, setIsFavoriteItem] = useState(false);

  let favoritesArr = useSelector(selectFavoritesProducts);

  useEffect(() => {
    favoritesArr.forEach((el) => {
      if (el.articleCodes[0] === product.articleCodes[0]) {
        setIsFavoriteItem(true);
      }
    });
  }, []);

  const addItemToCart = (product, size) => {
    dispatch(cartActions.addItemToCart({ productToAdd: product, size: size }));
  };

  const addRemovefromFavoritesHandler = () => {
    if (isFavoriteItem) {
      setIsFavoriteItem(false);
      dispatch(productsActions.removeFromFavorites({ item: product }));
    } else {
      setIsFavoriteItem(true);
      dispatch(productsActions.addToFavorites({ item: product }));
    }
  };

  const openSizesHandler = () => {
    setVisibleSizes((prev) => !prev);
  };

  const productsSizes = [...product.variantSizes];

  const addCartHandler = (product, size) => {
    setVisibleSizes((prev) => !prev);
    addItemToCart(product, size);
  };

  return (
    <Fragment>
      {!isLoadedImg && <p>Loading item...</p>}
      <div className={isLoadedImg ? style.product_card_container : style.hide}>
        <div className={style.img_btn_product_container}>
          <img
            className={style.product_img}
            src={product.images[0].url}
            alt={`${product.name}`}
            onLoad={() => setIsLoadedImg(true)}
          />

          <HeartLogo
            className={`${isFavoriteItem ? style.heart_logo_full : ""} ${
              style.heart_logo
            }`}
            onClick={addRemovefromFavoritesHandler}
          />
          <Button
            onClick={openSizesHandler}
            classes={btnStyle.buttonProduct}
            type="inverted"
          >
            Add to card
          </Button>
          <div
            className={`${style.size_container} ${
              visibleSizes ? style.visible_sizes : ""
            }`}
          >
            {productsSizes
              .sort((a, b) => a.orderFilter - b.orderFilter)
              .map((size) => (
                <div
                  onClick={() => addCartHandler(product, size.filterCode)}
                  className={style.size_box}
                  key={size.orderFilter + Math.random()}
                >
                  {size.filterCode}
                </div>
              ))}
          </div>
        </div>
        <div className={style.card_details_container}>
          <span className={style.name}>{product.name}</span>
          <span className={style.price}>{product.price.formattedValue}</span>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductCard;
