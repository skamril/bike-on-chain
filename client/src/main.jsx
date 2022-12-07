import React from "react";
import {ReactDOM, BrowserRouter } from "react-router-dom";
import { WagmiConfig, createClient, chain } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import App from "./App";
import "./index.css";

const alchemyId = import.meta.env.VITE_ALCHEMY_POL_MUM_ID;
const chains = [chain.mainnet,chain.goerli, chain.polygon, chain.polygonMumbai];
const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
    chains
  })
);

const container = document.getElementById("root");

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <WagmiConfig client={client}>
        <ConnectKitProvider>
          <App />
        </ConnectKitProvider>
      </WagmiConfig>
    </BrowserRouter>
  </React.StrictMode>
);
