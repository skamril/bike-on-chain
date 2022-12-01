import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, ConnectKitButton, getDefaultClient } from "connectkit";
import NavbarBoc from "../components/NavbarBoc";
const alchemyId = "hZFdAtuXzsgWF7VqEQR_tVIvPKe-0iKL";

const client = createClient(
  getDefaultClient({
    appName: "Your App Name",
    alchemyId,
  }),
);

export default function WelcomePage() {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
     
        <NavbarBoc  />
       
    
        </ConnectKitProvider>
    </WagmiConfig>
  );
}
