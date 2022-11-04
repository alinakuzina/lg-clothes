import style from "./CreditCard.module.scss";
import React, { useState, useEffect } from "react";

const CreditCard = (props) => {
  const [isFront, setIsFront] = useState(true);

  const focus = props.focus;

  useEffect(() => {
    if (focus === "number" || focus === "" || focus === "expires") {
      setIsFront(true);
    } else {
      setIsFront(false);
    }
  }, [focus]);
  const rotateHandler = () => {
    setIsFront((prev) => !prev);
  };

  return (
    <div
      className={`${style.card} ${!isFront && style.card_hover}`}
      onClick={rotateHandler}
    >
      <div className={`${style.card__front} ${style.card__part}`}>
        <p
          className={`${style.card_numer} ${
            focus === "number" ? style.focus : ""
          }`}
        >
          **** **** **** 6258
        </p>
        <div className={style.card__space_75}>
          <span className={style.card__label}>Card holder</span>
          <p className={style.card__info}>John Doe</p>
        </div>
        <div className={style.card__space_25}>
          <span className={style.card__label}>Expires</span>
          <p
            className={`${style.card__info} ${
              focus === "expires" ? style.focus : ""
            }`}
          >
            01/25
          </p>
        </div>
      </div>

      <div className={`${style.card__back} ${style.card__part}`}>
        <div className={style.card__black_line}></div>
        <div className={style.card__back_content}>
          <div className={style.card__secret}>
            <p
              className={`${style.card__secret__last} ${
                focus === "cvv" ? style.focus : ""
              }`}
            >
              000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditCard;
