import "./CartIcon.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag-icon.svg";
import { CartContext } from "../../context/CartContext";
import { useContext } from "react";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);
  const toggleCartIconHandler = () => {
    setIsCartOpen((prev) => !prev);
  };
  return (
    <div className="cart-icon-container" onClick={toggleCartIconHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">10</span>
    </div>
  );
};

export default CartIcon;
