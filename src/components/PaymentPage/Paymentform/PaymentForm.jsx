import style from "./PaymentForm.module.scss";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";

const PaymentForm = () => {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [street, setStreet] = useState("");
  let [postCode, setPostCode] = useState("");
  let [city, setCity] = useState("");
  let [country, setCountry] = useState("Germany");
  return (
    <form className={style.form}>
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
          classes={style.country_select}
        />
      </div>
    </form>
  );
};

export default PaymentForm;
