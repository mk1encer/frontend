import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { check } from "../../axios";
import { changeField, initializeForm, signin, info } from "../Auth";
import "../LoginPage/LoginPage.css";

function SignIn() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, user, headers } = useSelector(
    ({ auth, user }) => ({
      form: auth.SignIn,
      auth: auth.auth,
      authError: auth.authError,
      headers: auth.headers,
      user: user.user,
    })
  );

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
    dispatch(
      signin({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    dispatch(initializeForm("signin"));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError("에러 발생!");

      return;
    }

    if (auth) {
      const { userId } = auth;
      dispatch(check(userId));
    }
  }, [dispatch, auth, authError]);

  useEffect(() => {
    if (user) {
      try {
        setError(null);

        localStorage.setItem("user", JSON.stringify(user));

        dispatch(initializeForm("auth"));

        dispatch(initializeForm("headers"));
      } catch (e) {
        console.log("localStorage is not working");
      }
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (headers) {
      const { userid, token } = headers;

      localStorage.setItem("token", JSON.stringify(token));

      dispatch(info(userid));
    }
  }, [dispatch, headers]);

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
