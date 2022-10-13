import "./CartDropdown.scss";
import Button from "../../../Button/Button";
import btnStyle from "../../../Button/Button.module.scss";
import CartItem from "../CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../../store/Cart/CartReducer";
import {
  selectCartItems,
  selectIsCartOpen,
  selectItemsCount,
  selectTotalPrice,
} from "../../../../store/Cart/CartSelector";

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const setIsCartOpen = () => {
    dispatch(cartActions.setIsCartOpen());
  };

  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate("/checkout");
    setIsCartOpen();
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
      <Button classes={btnStyle.buyNow} onClick={goToCheckoutHandler}>
        BUY NOW
      </Button>
    </div>
  );
};

export default CartDropdown;
