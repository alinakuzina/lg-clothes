import CartItemInPage from "./CartItemOnPage";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import "./CartItemsPage.scss";

const CartItemsPage = () => {
  const { cartItems, addItemToCart, removeItem, reduceItemQuantity } =
    useContext(CartContext);
  return (
    <div className="cart-page-container">
      <div className="cart-items-container">
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
      <div className="cart-total-container">
        <div>TotalPrice:11$</div>
      </div>
    </div>
  );
};

export default CartItemsPage;
