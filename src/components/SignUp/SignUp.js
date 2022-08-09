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
import { toHaveErrorMessage } from "@testing-library/jest-dom/dist/matchers";

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

  const validate = (form, errors) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!form.email || form.email === null) {
      errors.email = "이메일을 입력해주세요";
    } else if (!regex.test(form.email)) {
      errors.email = "이메일 형식이 아닙니다";
    } else if (!checkedEmail) {
      errors.email = "이메일이 중복입니다";
    }

    if (!form.name || form.name === null) {
      errors.name = "이름을 입력해주세요";
    } else if (form.name.length < 2 || form.name.length > 16) {
      errors.name = "이름은 2~16자리로 입력해주세요";
    }

    if (!form.nickname || form.nickname === null) {
      errors.nickname = "닉네임을 입력해주세요";
    } else if (form.nickname.length < 2 || form.nickname.length > 16) {
      errors.nickname = "닉네임은 2~16자리로 입력해주세요";
    } else if (!checkedNickname) {
      errors.nickname = "닉네임이 중복입니다";
    }

    if (!form.password || form.password === null) {
      errors.password = "비밀번호를 입력해주세요";
    } else if (form.password.length < 2 || form.password.length > 16) {
      errors.password = "비밀번호는 2~16자리로 입력해주세요";
    }
    return errors;
  };

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
    let errors = {};

    if (Object.keys(validate(form, errors)).length !== 0) {
      alert("유효하지 않은 항목이 있습니다");
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

  useEffect(() => {
    dispatch(initializeForm("signup"));
  }, [dispatch]);

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
