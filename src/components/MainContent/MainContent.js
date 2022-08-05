import React from "react";
import { Grid } from "@mui/material";
import "./MainContent.css";
import StatusBar from "../StatusBar/StatusBar";
import MainPage from "../MainPage/MainPage";

function MainContent() {
  return (
    <div>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={6}>
          <div>
            <StatusBar />
            <MainPage />
          </div>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={2} />
      </Grid>
    </div>
  );
}

export default MainContent;
