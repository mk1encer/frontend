import React, { useState } from "react";
import { Grid } from "@mui/material";
import inst_image from "../../images/9364675fb26a.svg";
import inst_logo from "../../images/logoinsta.png";
import fb from "../../images/fb.png";
import appstore from "../../images/app.png";
import playstore from "../../images/play.png";
import auth from "../Auth";

import "./LoginPage.css";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";

function LoginPage() {
  const [isLogIn, setIsLogIn] = useState(true);

  const toggleSign = () => {
    setIsLogIn(!isLogIn);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={3} />
        <Grid item xs={6}>
          <div className="loginpage_main">
            <div>
              <img src={inst_image} width="454px" />
            </div>
            <div>
              <div className="loginpage_rightcomponent">
                <img className="loginpage_logo" src={inst_logo} />
                <div className="loginpage_signin">
                  {isLogIn ? <SignIn /> : <SignUp />}
                  <div className="login_ordiv">
                    <div className="login_divider"></div>
                    <div className="login_or">OR</div>
                    <div className="login_divider"></div>
                  </div>
                  <div className="login_fb">
                    <img src={fb} width="15px" style={{ marginRight: "5px" }} />
                    Log in with Facebook
                  </div>
                  <div className="login_forgt">Forgot password?</div>
                </div>
              </div>
              <div className="loginpage_signupoption">
                {isLogIn ? (
                  <div className="loginpage_sign">
                    Don't have an account?{" "}
                    <span
                      style={{ fontWeight: "bold", color: "#8395F6" }}
                      onClick={toggleSign}
                    >
                      Sign up
                    </span>
                  </div>
                ) : (
                  <div className="loginpage_sign">
                    Have an accout?{" "}
                    <span
                      style={{ fontWeight: "bold", color: "#8395F6" }}
                      onClick={toggleSign}
                    >
                      Sign in
                    </span>
                  </div>
                )}
              </div>
              <div className="loginpage_dwsection">
                <div>Get the app.</div>
                <div className="loginpage_option">
                  <img
                    className="loginpage_dwimg"
                    src={appstore}
                    width="136px"
                  />
                  <img
                    className="loginpage_dwimg"
                    src={playstore}
                    width="136px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
}

export default LoginPage;
