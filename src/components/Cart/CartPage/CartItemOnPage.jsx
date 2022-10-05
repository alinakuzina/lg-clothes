import style from "./CartItemOnPage.module.scss";
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
    <div className={style.container}>
      <img className={style.img} src={item.images[0].url} />
      <div className={style.info}>
        <h2>{item.name}</h2>
        <div className={style.cart_change_quantity_container}>
          <IconMinus
            className={style.icon_change_quantity}
            onClick={() => reduceItemQuantity(item)}
          >
            -
          </IconMinus>
          <div>{item.quantity} items</div>
          <IconPlus
            className={style.icon_change_quantity}
            onClick={() => addItemToCart(item, item.selectedSize)}
          ></IconPlus>
        </div>

        <div>Size: {item.selectedSize}</div>
        <div>Price: {item.price.formattedValue}</div>
        <div>Total: $ {(item.price.value * item.quantity).toFixed(2)}</div>
        <IconDelete
          className={style.icon_trash}
          onClick={() => removeItem(item)}
        >
          Delete
        </IconDelete>
      </div>
    </div>
  );
};

export default CartItemInPage;
