import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import { PostContext } from "./context/PostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PostContext>
      <App />
    </PostContext>
  </React.StrictMode>
);
