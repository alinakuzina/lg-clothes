import CartItemInPage from "./CartItemOnPage";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import "./CartItemsPage.scss";

const CartItemsPage = () => {
  const { cartItems, addItemToCart, removeItem, reduceItemQuantity } =
    useContext(CartContext);
  return (
    <div className="cart-page-container">
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
  );
};

export default CartItemsPage;
