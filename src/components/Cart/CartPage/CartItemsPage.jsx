import CartItemInPage from "./CartItemOnPage";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import style from "./CartItemsPage.module.scss";
import CartTotal from "./CartTotal";

const CartItemsPage = () => {
  const {
    cartItems,
    addItemToCart,
    removeItem,
    reduceItemQuantity,
    totalPrice,
  } = useContext(CartContext);
  return (
    <div className={style.cart_page_container}>
      <div className={style.cart_items_container}>
        {cartItems.map((item) => (
          <CartItemInPage
            key={item.articles[0].code + Math.random()}
            item={item}
            addItemToCart={addItemToCart}
            removeItem={removeItem}
            reduceItemQuantity={reduceItemQuantity}
          />
        ))}
      </div>
      <CartTotal total={totalPrice} />
    </div>
  );
};

export default CartItemsPage;
