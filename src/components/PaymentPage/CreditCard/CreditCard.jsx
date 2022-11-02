import style from "./CreditCard.module.scss";
import React, { useState } from "react";

const CreditCard = () => {
  return (
    <div className={style.card}>
      <div className={`${style.card__front} ${style.card__part}`}>
        <p className={style.card_numer}>**** **** **** 6258</p>
        <div className={style.card__space_75}>
          <span className={style.card__label}>Card holder</span>
          <p className={style.card__info}>John Doe</p>
        </div>
        <div className={style.card__space_25}>
          <span className={style.card__label}>Expires</span>
          <p className={style.card__info}>10/25</p>
        </div>
      </div>

      <div className={`${style.card__back} ${style.card__part}`}>
        <div className={style.card__black_line}></div>
        <div className={style.card__back_content}>
          <div className={style.card__secret}>
            <p className={style.card__secret__last}>420</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreditCard;
