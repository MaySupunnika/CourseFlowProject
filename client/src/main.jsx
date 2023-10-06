import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import jwtInterceptor from "./utils/jwtInterceptors.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authentication.jsx";
import { DataCenterProvider } from "./context/DataCenter.jsx";
jwtInterceptor();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataCenterProvider>
          <App />
        </DataCenterProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
