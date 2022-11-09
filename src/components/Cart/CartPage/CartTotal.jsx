import style from "./CartTotal.module.scss";
import Button from "../../Button/Button";
import btnStyle from "../../Button/Button.module.scss";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../../store/User/UserSelector";
import { useSelector } from "react-redux";
const CartTotal = ({ total }) => {
  const user = useSelector(selectCurrentUser);
  let dateNow = new Date();
  const navigate = useNavigate();
  dateNow.setDate(dateNow.getDate() + 5);
  const payHandler = () => {
    navigate("/payment");
  };

  const redirectToLoginHandler = () => {
    navigate("/authentication");
  };

  return (
    <div className={style.cart_total_container}>
      <div>
        <div className={style.cart_total_info}>
          <div>
            <b>Delivery:</b> $ 3.50
          </div>

          <div>
            <b>Indicative delivery date :</b> {dateNow.toLocaleDateString()}{" "}
          </div>
          <div className={style.cart_line}></div>
          <div>
            <b>Total Price:</b> ${total}
          </div>
        </div>
      </div>
      {user && (
        <Button classes={btnStyle.buyNow} onClick={payHandler}>
          Pay now
        </Button>
      )}
      {!user && (
        <Button classes={btnStyle.buyNow} onClick={redirectToLoginHandler}>
          Login to place an order
        </Button>
      )}
    </div>
  );
};

export default CartTotal;
