import style from "./PaymentItem.module.scss";

const PaymentItem = ({ item }) => {
  console.log(item);
  return (
    <div className={style.item_container}>
      <img className={style.img} src={item.images[0].url} />
      <div className={style.description_container}>
        <div>{item.name}</div>
        <div>
          {item.quantity} &#215; {item.price.formattedValue}
        </div>
      </div>
    </div>
  );
};

export default PaymentItem;
