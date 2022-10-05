import style from "./ProductCard.module.scss";
import Button from "../Button/Button";
import btnStyle from "../Button/Button.module.scss";
import { ReactComponent as HeartLogo } from "../../assets/heart.svg";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const [visibleSizes, setVisibleSizes] = useState(false);
  const { addItemToCart } = useContext(CartContext);

  const openSizesHandler = () => {
    setVisibleSizes((prev) => !prev);
  };

  const addCartHandler = (product, size) => {
    setVisibleSizes((prev) => !prev);
    addItemToCart(product, size);
  };

  return (
    <div className={style.product_card_container}>
      <div className={style.img_btn_product_container}>
        <img
          className={style.product_img}
          src={product.images[0].url}
          alt={`${product.name}`}
        />
        <HeartLogo className={style.heart_logo} />
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
          {product.variantSizes
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
  );
};

export default ProductCard;
