import "./CartItemOnPage.scss";
import { ReactComponent as IconMinus } from "../../../assets/minus.svg";
import { ReactComponent as IconPlus } from "../../../assets/plus.svg";
import { ReactComponent as IconDelete } from "../../../assets/trash-icon.svg";

const CartItemInPage = ({
  item,
  addItemToCart,
  removeItem,
  reduceItemQuantity,
}) => {
  return (
    <div className="cart-item-container">
      <img className="cart-img" src={item.images[0].url} />
      <div className="cart-item-info">
        <h2>{item.name}</h2>
        <div className="cart-change-quantity-container">
          <IconMinus
            className="icon-change-quantity"
            onClick={() => reduceItemQuantity(item)}
          >
            -
          </IconMinus>
          <div>{item.quantity} items</div>
          <IconPlus
            className="icon-change-quantity"
            onClick={() => addItemToCart(item, item.selectedSize)}
          ></IconPlus>
        </div>

        <div>Size: {item.selectedSize}</div>
        <div>Price: {item.price.formattedValue}</div>
        <div>Total: {(item.price.value * item.quantity).toFixed(2)}</div>
        <IconDelete className="icon-trash" onClick={() => removeItem(item)}>
          Delete
        </IconDelete>
      </div>
    </div>
  );
};

export default CartItemInPage;
