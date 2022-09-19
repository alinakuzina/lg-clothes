import "./CartDropdown.scss";
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  console.log(cartItems);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => {
          return <CartItem key={item.articles.code} cartItem={item} />;
        })}
      </div>
      <Button>Go to checkout</Button>
    </div>
  );
};

export default CartDropdown;
