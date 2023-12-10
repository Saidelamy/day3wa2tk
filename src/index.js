import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// جزء البوتستراب
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
// جزء الجي كويري
import "jquery/dist/jquery.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MediaContextProvider } from "./MediaContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <MediaContextProvider>
        <App />
      </MediaContextProvider>
    </BrowserRouter>
  </>
);
