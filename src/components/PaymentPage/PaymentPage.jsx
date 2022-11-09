import style from "./PaymentPage.module.scss";
import {
  selectCartItems,
  selectTotalPrice,
} from "../../store/Cart/CartSelector";
import { useSelector } from "react-redux";
import Button from "../Button/Button";
import btnStyle from "../Button/Button.module.scss";
import PaymentItem from "./PaymentItem/PaymentItem";
import PaymentForm from "./PaymentForm/PaymentForm";
const PaymentPage = () => {
  let total = useSelector(selectTotalPrice);
  let items = useSelector(selectCartItems);

  let dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 5);

  return (
    <div className={style.payment_page_container}>
      <div className={style.form_container}>
        <PaymentForm />
      </div>
      <div className={style.total_container}>
        <div className={style.payment_total_container}>
          <div className={style.items_container}>
            {items.map((item) => {
              return <PaymentItem item={item} key={item.articleCodes} />;
            })}
          </div>
          <div>
            <div className={style.payment_total_info}>
              <div>
                <b>Delivery:</b> $ 3.50
              </div>

              <div>
                <b>Indicative delivery date :</b> {dateNow.toLocaleDateString()}{" "}
              </div>
              <div className={style.payment_line}></div>
              <div>
                <b>Total Price:</b> ${total}
              </div>
            </div>
          </div>

          {/* <Button classes={btnStyle.buyNow}>Pay now</Button> */}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
