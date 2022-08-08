import client from "./client";

export const SignIn = ({ email, password }) => {
  console.log("Signin");
  client.post("auth-service/login", {
    email,
    password,
  });
};

export const SignUp = ({ email, fullname, username, password }) => {
  console.log("signup");
  client.post("./auth-service/register", {
    email,
    fullname,
    username,
    password,
  });
};

export const getUser = ({ userId }) =>
  client.getUser("./auth-service/:userId/getUser", { userId });
