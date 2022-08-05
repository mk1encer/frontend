import React from "react";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import Home from "./components/HomePage/Home";
function App() {
  return (
    <div className="App">
      {
        <LoginPage />
        //<Home />
      }
    </div>
  );
}

export default App;
