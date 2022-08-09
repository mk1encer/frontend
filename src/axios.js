import client from "./client";

const customConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const SignIn = ({ email, password }) => {
  console.log("Signin");
  client.post(
    "signin",
    JSON.stringify({
      email,
      password,
    }),
    customConfig
  );
};

export const SignUp = ({ email, name, nickname, password }) => {
  console.log("signup");
  client.post(
    "./signup",
    JSON.stringify({
      email,
      name,
      nickname,
      password,
    }),
    customConfig
  );
};

export const getUser = ({ userId }) =>
  client.get(`/${userId}/getUser`, {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });

export const check = (userId) =>
  client.get(`/${userId}/check`, {
    headers: {
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  });

export const checkEmail = ({ email }) =>
  client.post("/signup/email", JSON.stringify({ email }), customConfig);
export const checkNickname = ({ nickname }) =>
  client.post("/signup/nickname", JSON.stringify({ nickname }), customConfig);
