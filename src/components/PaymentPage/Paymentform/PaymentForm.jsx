import style from "./PaymentForm.module.scss";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import CreditCard from "../CreditCard/CreditCard";
import Button from "../../Button/Button";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Germany");
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [month, SetMonth] = useState("");
  const [year, SetYear] = useState("");
  const [expiry, SetExpiry] = useState("");
  const [cvv, SetCvv] = useState("");

  const [error, setError] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const [focus, setFocus] = useState("");

  const expiresFocushandler = () => {
    setFocus("expires");
  };

  const numberFocushandler = () => {
    setFocus("number");
  };

  const cvvFocushandler = () => {
    setFocus("cvv");
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setError("");
    setIsSubmited(false);
    if (firstName.length < 0) {
      setError("Please check your first name ");
    } else if (lastName.length < 0) {
      setError("Please check your last name ");
    } else if (street.length < 0) {
      setError("Please check your street ");
    } else if (postCode.length < 0 || isNaN(postCode)) {
      setError("Please check your postal code ");
    } else if (city.length < 0) {
      setError("Please check your city ");
    } else if (number.length < 16 || isNaN(number)) {
      console.log(number);
      setError("Please check your card number ");
    } else if (name.length < 0) {
      console.log(name);
      setError("Please check your name in card details ");
    } else if (month === "Month" || month.length === 0) {
      setError("Please check month in card details ");
    } else if (year === "Year" || year.length === 0) {
      setError("Please check year in card details ");
    } else if (cvv.length < 3 || isNaN(cvv)) {
      setError("Please check your cvv in card details ");
    } else {
      setIsSubmited(true);

      setError("");
    }
  };

  const handleDate = (e) => {
    SetMonth(e.target.value);
    SetExpiry(e.target.value);
  };
  const handleExpiry = (e) => {
    SetYear(e.target.value);
    SetExpiry(month.concat(e.target.value));
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 10000 }),
    }).then((res) => {
      return res.json();
    });

    const clientSecret = response.paymentIntent.client_secret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: { name: "test name" },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("payment succssesful");
      }
    }

    console.log(response.paymentIntent.client_secret);
  };

  return (
    <form className={style.form} onSubmit={paymentHandler}>
      {/* <div className={style.main_header}>Shipping Adress</div>
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
      <CreditCard
        name={name}
        number={number}
        cvv={cvv}
        month={month}
        year={year}
      />
      <div className={style.group}>
        <input
          type="tel"
          className={style.form_input}
          value={number}
          name="number"
          autoComplete="cc-number"
          maxLength="16"
          pattern="[0-9\s]{13,16}"
          inputMode="numeric"
          required
          onChange={(e) => {
            SetNumber(e.target.value);
          }}
        ></input>
        <label
          className={`${style.form_input_label} 
      ${number.length > 0 ? style.shrink : ""}`}
        >
          Card Number
        </label>
      </div>

      <div className={style.group}>
        <input
          type="text"
          className={style.form_input}
          value={name}
          name="name"
          required
          onChange={(e) => {
            SetName(e.target.value);
          }}
        ></input>
        <label
          className={`${style.form_input_label} 
      ${name.length > 0 ? style.shrink : ""}`}
        >
          Card Name
        </label>
      </div>
      <div className={style.grid_three_column}>
        <label className={style.label_date}>Expiration Date</label>
        <select
          className={style.select}
          required
          name="expiry"
          onChange={handleDate}
        >
          <option value=" ">Month</option>
          <option value="01">Jan</option>
          <option value="02">Feb</option>
          <option value="03">Mar</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">Aug</option>
          <option value="09">Sep</option>
          <option value="10">Oct</option>
          <option value="11">Nov</option>
          <option value="12">Dec</option>
        </select>
        <select
          className={style.select}
          name="expiry"
          onChange={handleExpiry}
          required
        >
          <option value=" ">Year</option>
          <option value="22">2022</option>
          <option value="23">2023</option>
          <option value="24">2024</option>
          <option value="25">2025</option>
          <option value="26">2026</option>
          <option value="27">2027</option>
          <option value="28">2028</option>
          <option value="29">2029</option>
          <option value="30">2030</option>
        </select>
      </div>

      <div className={style.group}>
        <input
          type="tel"
          name="cvc"
          maxLength="3"
          className={style.form_input}
          value={cvv}
          required
          pattern="\d*"
          onChange={(e) => {
            SetCvv(e.target.value);
          }}
        ></input>
        <label
          className={`${style.form_input_label} 
      ${cvv.length > 0 ? style.shrink : ""}`}
        >
          CVV
        </label>
      </div>
      {error.length > 0 && <div className={style.error_message}>{error}</div>} */}

      <CreditCard focus={focus} />

      <CardNumberElement onFocus={numberFocushandler} />
      <CardExpiryElement onFocus={expiresFocushandler} />
      <CardCvcElement onFocus={cvvFocushandler} />
      <Button type="inverted">Pay now</Button>

      {/* <Button type="submit">Confirm shipping and payment details</Button> */}
    </form>
  );
};

export default PaymentForm;
