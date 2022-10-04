import "./CartDropdown.scss";
import Button from "../../../Button/Button";
import CartItem from "../CartItem/CartItem";
import { useContext } from "react";
import { CartContext } from "../../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems, totalPrice, setIsCartOpen } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
    setIsCartOpen((prev) => !prev);
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
      <Button classes="buy-now" onClick={goToCheckoutHandler}>
        BUY NOW
      </Button>
    </div>
  );
};

export default CartDropdown;