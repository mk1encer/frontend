import { changeField, signup } from "../Auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../LoginPage/LoginPage.css";

const SignUp = () => {
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

    const { email, name, nickname, password } = form;

    if ([email, name, nickname, password].includes("")) {
      // 빈칸 있으면 오류
      return;
    }

    dispatch(
      signup({
        email,
        name,
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
          name="name"
          onChange={onChange}
          value={form.name}
        />
        <input
          className="loginpage_textbox"
          type="text"
          placeholder="Nickname"
          name="nickname"
          onChange={onChange}
          value={form.nickname}
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
};

export default SignUp;
