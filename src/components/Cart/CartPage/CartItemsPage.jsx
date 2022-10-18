import CartItemInPage from "./CartItemOnPage";

import style from "./CartItemsPage.module.scss";
import CartTotal from "./CartTotal";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../../store/Cart/CartReducer";
import {
  selectCartItems,
  selectTotalPrice,
} from "../../../store/Cart/CartSelector";
import { useEffect } from "react";

const CartItemsPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const addItemToCart = (item, size) => {
    dispatch(cartActions.addItemToCart({ productToAdd: item, size: size }));
  };
  const removeItem = (item) => {
    dispatch(cartActions.removeItem({ item: item }));
  };
  const reduceItemQuantity = (item) => {
    dispatch(cartActions.reduceItemQuantity({ item: item }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
