<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Admin from "./pages/Admin";
import Collection from "./pages/Collection.jsx";
import CreateNfts from "./pages/CreateNfts";
import Maintenance from "./pages/Maintenance";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function App() {
  const { isConnected } = useAccount();
  return isConnected ? (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/createnfts" element={<CreateNfts />} />
      <Route path="/maintenance" element={<Maintenance />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
    </Routes>
  );
}
=======
import WelcomePage from "./pages/WelcomePage";
function App() {
  return (
    <div>
      <WelcomePage />
    </div>
  );
}

>>>>>>> dd0fe45 (Modif du nom des compostants, ajout contrat solidity dans hardhat  (#1))
export default App;
