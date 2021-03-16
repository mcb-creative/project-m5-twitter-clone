import React from "react";
import ReactDOM from "react-dom";
import App from "../src/components/App";
import { CurrentUserProvider } from "../src/components/CurrentUserContext";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
