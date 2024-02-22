import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/global.css";
import { Pairs } from "./pairs.page.jsx";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Pairs />
  </BrowserRouter>
);
