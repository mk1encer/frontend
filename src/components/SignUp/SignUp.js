import {
  changeField,
  initializeForm,
  signup,
  checkEmail,
  checkNickname,
} from "../Auth";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../LoginPage/LoginPage.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { form, auth, authError, checkedEmail, checkedNickname } = useSelector(
    ({ auth }) => ({
      form: auth.SignUp,
      auth: auth.auth,
      authError: auth.authError,
      checkedEmail: auth.checkedEmail,
      checkedNickname: auth.checkedNickname,
    })
  );

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
      setError("모든 칸을 채워주세요");
      console.log("모든 칸을 채워주세요");

      return;
    }

    if (checkedEmail && checkedNickname) {
      dispatch(
        signup({
          email,
          name,
          nickname,
          password,
        })
      );
    }

    // dispatch(
    //   signup({
    //     email,
    //     name,
    //     nickname,
    //     password,
    //   })
    // );
  };

  useEffect(() => {
    dispatch(initializeForm("signup"));
  }, [dispatch]);

  useEffect(() => {
    const { email } = form;

    dispatch(checkEmail(email));

    if (!checkedEmail) {
      setError("이메일 중복!");

      return;
    }
  }, [dispatch, checkedEmail, form]);

  useEffect(() => {
    const { nickname } = form;

    dispatch(checkNickname(nickname));

    if (!checkedNickname) {
      setError("닉네임 중복!");

      return;
    }
  }, [dispatch, checkedNickname, form]);

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
