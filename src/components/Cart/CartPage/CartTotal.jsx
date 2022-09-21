import "./CartTotal.scss";
import Button from "../../Button/Button";

const CartTotal = ({ total }) => {
  let dateNow = new Date();
  dateNow.setDate(dateNow.getDate() + 5);

  return (
    <div className="cart-total-container">
      <div>
        <div className="cart-total-info">
          <div>
            <b>Delivery:</b> $ 3.50
          </div>

          <div>
            <b>Indicative delivery date :</b> {dateNow.toLocaleDateString()}{" "}
          </div>
          <div className="cart-line"></div>
          <div>
            <b>Total Price:</b> ${total}
          </div>
        </div>
      </div>
      <Button classes="buy-now">Pay now </Button>
    </div>
  );
};

export default CartTotal;
