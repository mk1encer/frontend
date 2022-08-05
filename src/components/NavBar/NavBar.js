import React from "react";
import inst_logo from "../../images/logoinsta.png";
import home from "../../images/home.svg";
import message from "../../images/message.svg";
import find from "../../images/find.svg";
import love from "../../images/love.svg";
import pp from "../../images/pp1.png";
import { Grid, Avatar } from "@mui/material";
import "./NavBar.css";

function NavBar() {
  return (
    <div>
      <div className="navbar_content">
        <Grid container>
          <Grid item xs={2} />
          <Grid item xs={3}>
            <img className="navbar_logo" src={inst_logo} width="105px" />
          </Grid>
          <Grid item xs={3}>
            <input text="text" className="navbar_search" placeholder="Search" />
          </Grid>
          <Grid item xs={3} style={{ display: "flex" }}>
            <img className="navbar_img" src={home} width="25px" />
            <img className="navbar_img" src={message} width="25px" />
            <img className="navbar_img" src={find} width="25px" />
            <img className="navbar_img" src={love} width="25px" />
            <Avatar
              className="navbar_img"
              src={pp}
              style={{ maxWidth: "25px", maxHeight: "25px" }}
            />
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </div>
    </div>
  );
}

export default NavBar;
