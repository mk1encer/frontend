import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeField } from "../Auth";
import "../LoginPage/LoginPage.css";

function SignIn() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => ({
    form: auth.SignIn,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;

    dispatch(
      changeField({
        form: "SignIn",
        key: name,
        value,
      })
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          className="loginpage_textbox"
          type="text"
          placeholder="email"
          name="email"
          onChange={onChange}
          value={form.email}
        />
        <input
          className="loginpage_textbox"
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
          value={form.password}
        />
        <button className="login_button">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
