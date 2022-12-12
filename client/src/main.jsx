import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";
import { EthProvider } from "./components/contexts/EthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <BrowserRouter>
        <EthProvider>
          <App />
        </EthProvider>
      </BrowserRouter>
    </NextUIProvider>
  </React.StrictMode>
);
