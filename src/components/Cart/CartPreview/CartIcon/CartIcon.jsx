import "./CartIcon.scss";
import { ReactComponent as ShoppingIcon } from "../../../../assets/shopping-bag-icon.svg";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../../store/Cart/CartReducer";
import {
  selectCartItems,
  selectIsCartOpen,
  selectItemsCount,
  selectTotalPrice,
} from "../../../../store/Cart/CartSelector";

const CartIcon = () => {
  const dispatch = useDispatch();
  const itemsCount = useSelector(selectItemsCount);
  const setIsCartOpen = () => {
    dispatch(cartActions.setIsCartOpen());
  };

  const toggleCartIconHandler = () => {
    setIsCartOpen();
  };
  return (
    <div className="cart-icon-container" onClick={toggleCartIconHandler}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemsCount}</span>
    </div>
  );
};

export default CartIcon;
