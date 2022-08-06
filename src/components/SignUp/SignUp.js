import { changeField } from "../Auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../LoginPage/LoginPage.css";

function SignUp() {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ auth }) => ({
    form: auth.SignUp,
    auth: auth.auth,
    authError: auth.authError,
  }));

  const onChange = (e) => {
    const { value, name } = e.target;

    dispatch(
      changeField({
        form: "SignUp",
        key: name,
        value,
      })
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const { email, fullname, nickname, password } = form;

    if ([email, fullname, nickname, password].includes("")) {
      // setError
      return;
    }

    dispatch(
      SignUp({
        email,
        fullname,
        nickname,
        password,
      })
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          className="loginpage_textbox"
          type="text"
          placeholder="Mobile number or Email"
          name="email"
          onChange={onChange}
          value={form.email}
        />
        <input
          className="loginpage_textbox"
          type="text"
          placeholder="Full Name"
          name="fullname"
          onChange={onChange}
          value={form.fullname}
        />
        <input
          className="loginpage_textbox"
          type="text"
          placeholder="Username"
          name="username"
          onChange={onChange}
          value={form.username}
        />
        <input
          className="loginpage_textbox"
          type="text"
          placeholder="Password"
          name="password"
          onChange={onChange}
          value={form.password}
        />
        <button className="login_button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
