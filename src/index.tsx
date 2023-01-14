import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";

const darkTheme = {
  textColor: "#144e5a",
  backgroundColor: "#1d1b23",
  boxColor: "#ffb901",
};

const lightTheme = {
  textColor: "#ffb901",
  backgroundColor: "#ebe3cc",
  boxColor: "#144e5a",
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
