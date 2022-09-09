import { useState } from "react";
import {
  createUserWithEmail,
  createUserDocumentFromAuth,
} from "../../utilits/farebase";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFiels] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFiels({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFiels(defaultFormFields);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(
        "Password and Confirm Password should be the same . Please check your data."
      );
      return;
    }

    try {
      const response = await createUserWithEmail(email, password);
      await createUserDocumentFromAuth(response.user, { displayName });
      resetFormFields();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Don`t have an account?</h1>
      <h2>Sign up with your email and password</h2>
      <form onSubmit={submitHandler}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          autoComplete="name"
          value={displayName}
        ></input>

        <label>Email</label>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          autoComplete="email"
          value={email}
        ></input>

        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          autoComplete="new-password"
          value={password}
        ></input>

        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
        ></input>
        <button type="submit"> Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
