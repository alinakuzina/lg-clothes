import style from "./Order.module.scss";
import { ReactComponent as Plus } from "../../../../assets/plus.svg";
import { useState } from "react";
const Order = ({ order }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const showMoreHandler = () => {
    setIsShowMore((prev) => !prev);
  };
  return (
    <div className={style.order_container}>
      <div>
        <p>
          <b>Date:</b> {order.date}
        </p>
      </div>
      <div>
        <p>
          <b>Items:</b>
        </p>
        <div className={style.img_container}>
          {isShowMore &&
            order.items.map((item, id) => {
              return (
                <img src={item.images[0].url} className={style.img} key={id} />
              );
            })}
          {!isShowMore &&
            order.items
              .filter((el, index) => index < 3)
              .map((item, id) => {
                return (
                  <img
                    src={item.images[0].url}
                    className={style.img}
                    key={id}
                  />
                );
              })}

          <Plus className={style.plus} onClick={showMoreHandler} />
        </div>
      </div>
      <div className={style.adress}>
        <b>Shipping adress:</b>
        <p>
          {order.adress.firstName} {order.adress.lastName}
        </p>
        <p>{order.adress.street}</p>
        <p>
          {order.adress.postCode} {order.adress.city}
        </p>
        <p>{order.adress.country}</p>
      </div>
      <div className={style.price}>
        <b>${order.totalPrice}</b>
      </div>
    </div>
  );
};

export default Order;
