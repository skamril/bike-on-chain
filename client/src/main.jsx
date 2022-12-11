import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { WagmiConfig, createClient } from "wagmi";
import { configureChains } from "@wagmi/core";
import { polygonMumbai } from "@wagmi/core/chains";
import { infuraProvider } from "wagmi/providers/infura";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ConnectKitProvider } from "connectkit";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

const { chains, provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [infuraProvider({ apiKey: import.meta.env.VITE_INFURA_KEY })]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    new MetaMaskConnector({ chains }),
  ],
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <WagmiConfig client={client}>
        <ConnectKitProvider
          options={{
            hideNoWalletCTA: true,
            language: "fr-FR",
            showAvatar: false,
          }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConnectKitProvider>
      </WagmiConfig>
    </NextUIProvider>
  </React.StrictMode>
);
