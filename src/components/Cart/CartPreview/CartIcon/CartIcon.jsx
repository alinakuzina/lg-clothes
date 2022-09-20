import "./CartIcon.scss";
import { ReactComponent as ShoppingIcon } from "../../../../assets/shopping-bag-icon.svg";
import { CartContext } from "../../../../context/CartContext";
import { useContext } from "react";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, itemsCount } = useContext(CartContext);
  const toggleCartIconHandler = () => {
    setIsCartOpen((prev) => !prev);
  };
  return (
    <div className="cart-icon-container" onClick={toggleCartIconHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemsCount}</span>
    </div>
  );
};

export default CartIcon;
