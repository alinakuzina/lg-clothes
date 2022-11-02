import style from "./CreditCard.module.scss";
import React, { useState, useEffect } from "react";

const CreditCard = (props) => {
  const [isFront, setIsFront] = useState(true);
  let { name, number, month, year, cvv } = props;
  let numberFormat = number.split("").map((a, i) => {
    if (i % 4 === 0) {
      return ` ${a}`;
    } else {
      return `${a}`;
    }
  });

  useEffect(() => setIsFront(false), [cvv]);
  const rotateHandler = () => {
    setIsFront((prev) => !prev);
  };

  useEffect(() => setIsFront(true), [name, number, month, year]);

  return (
    <div
      className={`${style.card} ${!isFront && style.card_hover}`}
      onClick={rotateHandler}
    >
      <div className={`${style.card__front} ${style.card__part}`}>
        <p className={style.card_numer}>
          {number.length > 0 ? numberFormat : "**** **** **** 6258"}
        </p>
        <div className={style.card__space_75}>
          <span className={style.card__label}>Card holder</span>
          <p className={style.card__info}>
            {name.length > 0 ? name : "John Doe"}
          </p>
        </div>
        <div className={style.card__space_25}>
          <span className={style.card__label}>Expires</span>
          <p className={style.card__info}>
            {month.length > 0 ? month : "01"}/{year.length > 0 ? year : "22"}
          </p>
        </div>
      </div>

      <div className={`${style.card__back} ${style.card__part}`}>
        <div className={style.card__black_line}></div>
        <div className={style.card__back_content}>
          <div className={style.card__secret}>
            <p className={style.card__secret__last}>
              {cvv.length > 0 ? cvv : "000"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditCard;
