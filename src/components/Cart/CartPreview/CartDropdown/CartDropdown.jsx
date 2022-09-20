import "./CartDropdown.scss";
import Button from "../../../Button/Button";
import CartItem from "../CartItem/CartItem";
import { useContext } from "react";
import { CartContext } from "../../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => {
          return (
            <CartItem
              key={item.articles[0].code + Math.random()}
              cartItem={item}
            />
          );
        })}
      </div>
      <Button onClick={goToCheckoutHandler}>BUY NOW</Button>
    </div>
  );
};

export default CartDropdown;
