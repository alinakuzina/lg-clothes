import style from "./PaymentForm.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import CreditCard from "../CreditCard/CreditCard";
import Button from "../../Button/Button";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { userActions } from "../../../store/User/UserReducer";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import {
  selectTotalPrice,
  selectCartItems,
} from "../../../store/Cart/CartSelector";
import btnStyle from "../../Button/Button.module.scss";
import { selectCurrentUser } from "../../../store/User/UserSelector";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

const PaymentForm = () => {
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();
  const currentUser = useSelector(selectCurrentUser);
  const totalPriceTemp = useSelector(selectTotalPrice);
  const totalPrice = totalPriceTemp.toString().replace(".", "");
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Germany");

  const [error, setError] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const [focus, setFocus] = useState("");

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  const expiresFocushandler = () => {
    setFocus("expires");
  };

  const numberFocushandler = () => {
    setFocus("number");
  };

  const cvvFocushandler = () => {
    setFocus("cvv");
  };

  const redirectToLoginHandler = () => {
    navigate("/authentication");
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) {
      return;
    }

    if (firstName.length < 0) {
      setError("Please check your first name ");
      return;
    } else if (lastName.length < 0) {
      setError("Please check your last name ");
      return;
    } else if (street.length < 0) {
      setError("Please check your street ");
      return;
    } else if (postCode.length < 0 || isNaN(postCode)) {
      setError("Please check your postal code ");
      return;
    } else if (city.length < 0) {
      setError("Please check your city ");
      return;
    } else {
      setError("");
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: totalPrice }),
    }).then((res) => {
      return res.json();
    });

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: currentUser.displayName,
          email: currentUser.email,
        },
      },
    });

    if (paymentResult.error) {
      setError(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        setIsSubmited(true);

        dispatch(
          userActions.addOrder({
            order: {
              items: items,
              totalPrice: totalPriceTemp,
              date: today,
            },
          })
        );
      }
    }

    console.log(response.paymentIntent.client_secret);
  };

  return (
    <React.Fragment>
      {!isSubmited && !currentUser && (
        <div className={style.succsses_message_container}>
          <Button onClick={redirectToLoginHandler}>
            Login to place an order
          </Button>
        </div>
      )}
      {!isSubmited && currentUser && (
        <form id="paymentForm" className={style.form} onSubmit={paymentHandler}>
          <div className={style.main_header}>Shipping Adress</div>
          <div className={style.aditional_header}>
            Please enter your shipping adress
          </div>
          <div className={style.grid_two_column}>
            <div className={style.group}>
              <input
                className={style.form_input}
                type="string"
                required
                name="firstName"
                autoComplete="first name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              ></input>
              <label
                className={`${style.form_input_label} 
      ${firstName.length > 0 ? style.shrink : ""}`}
              >
                First Name
              </label>
            </div>

            <div className={style.group}>
              <input
                className={style.form_input}
                type="string"
                required
                name="lastName"
                autoComplete="last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              ></input>
              <label
                className={`${style.form_input_label} 
      ${lastName.length > 0 ? style.shrink : ""}`}
              >
                Last Name
              </label>
            </div>

            <div className={style.group}>
              <input
                className={style.form_input}
                type="string"
                required
                name="street"
                autoComplete="address"
                onChange={(e) => setStreet(e.target.value)}
                value={street}
              ></input>
              <label
                className={`${style.form_input_label} 
      ${street.length > 0 ? style.shrink : ""}`}
              >
                Street Adress
              </label>
            </div>

            <div className={style.group}>
              <input
                className={style.form_input}
                type="string"
                required
                name="city"
                autoComplete="city name"
                onChange={(e) => setCity(e.target.value)}
                value={city}
              ></input>
              <label
                className={`${style.form_input_label} 
      ${city.length > 0 ? style.shrink : ""}`}
              >
                City
              </label>
            </div>

            <div className={style.group}>
              <input
                className={style.form_input}
                type="string"
                required
                name="city"
                autoComplete="postal_code"
                onChange={(e) => setPostCode(e.target.value)}
                value={postCode}
              ></input>
              <label
                className={`${style.form_input_label} 
      ${postCode.length > 0 ? style.shrink : ""}`}
              >
                Postal Code
              </label>
            </div>

            <CountryDropdown
              value={country}
              onChange={(e) => setCountry(e)}
              classes={style.select}
              required
            />
          </div>

          <div className={style.main_header}>Payment details</div>

          <CreditCard focus={focus} />

          <div className={style.card_details_container}>
            <CardNumberElement onFocus={numberFocushandler} />
            <CardExpiryElement onFocus={expiresFocushandler} />
            <CardCvcElement onFocus={cvvFocushandler} />
          </div>

          {error.length > 0 && (
            <div className={style.error_message}>{error}</div>
          )}
          <Button classes={btnStyle.buyNow} type="inverted">
            Pay now
          </Button>
        </form>
      )}
      {isSubmited && (
        <div className={style.succsses_message_container}>
          <p>Thanks, your order has been received. </p>
        </div>
      )}
    </React.Fragment>
  );
};

export default PaymentForm;
