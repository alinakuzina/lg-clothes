import "./ProductCard.scss";
import Button from "../Button/Button";
import { ReactComponent as HeartLogo } from "../../assets/heart.svg";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const [visibleSizes, setVisibleSizes] = useState(false);

  const addCardhandler = () => {
    console.log(visibleSizes);
    setVisibleSizes((prev) => !prev);
  };

  return (
    <div className="product-card-container">
      <div className="img-btn-product-container">
        <img
          className="product-img"
          src={product.images[0].url}
          alt={`${product.name}`}
        />
        <HeartLogo className="heart-logo" />
        <Button
          onClick={addCardhandler}
          classes="button-product"
          type="inverted"
        >
          Add to card
        </Button>
        <div
          className={`size-container ${visibleSizes ? "visible-sizes" : ""}`}
        >
          {product.variantSizes
            .sort((a, b) => a.orderFilter - b.orderFilter)
            .map((size) => (
              <div
                onClick={addCardhandler}
                className="size-box"
                key={size.orderFilter + Math.random()}
              >
                {size.filterCode}
              </div>
            ))}
        </div>
      </div>
      <div className="card-details-container">
        <span className="name">{product.name}</span>
        <span className="price">{product.price.formattedValue}</span>
      </div>
    </div>
  );
};

export default ProductCard;
