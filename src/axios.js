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
  client.getUser("./auth-service/:userId/getUser", { userId });
