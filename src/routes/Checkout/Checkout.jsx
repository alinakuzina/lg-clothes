import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./Checkout.scss";
import CartItemsPage from "../../components/Cart/CartPage/CartItemsPage";

const Checkout = () => {
  return <CartItemsPage />;
};

export default Checkout;
