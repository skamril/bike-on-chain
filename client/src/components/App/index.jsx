import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import About from "./About";
import { Container, Loading } from "@nextui-org/react";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Certificates from "./Certificates";
import CreateCertificates from "./CreateCertificates";
import CreateManufacturer from "./CreateManufacturer";
import useEth from "../contexts/EthContext/useEth";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import CertificateGroups from "./CertificateGroups";
import Nft from "./Nft";

function App() {
  const {
    state: { isConnected, isOwner, isManufacturer },
  } = useEth();

  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        minWidth: 900,
      }}
    >
      <Header />
      <Container lg css={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          {isConnected && (
            <>
              {isOwner && (
                <Route
                  path="/add-manufacturer"
                  element={<CreateManufacturer setLoading={setLoading} />}
                />
              )}
              {isManufacturer && (
                <Route
                  path="/create-certificates"
                  element={<CreateCertificates setLoading={setLoading} />}
                />
              )}
              {isManufacturer && (
                <Route
                  path="/my-certificate-groups"
                  element={<CertificateGroups setLoading={setLoading} />}
                />
              )}
              <Route
                path="/my-certificates"
                element={<Certificates />}
                setLoading={setLoading}
              />
              <Route
                path="/:collectionAddr/:tokenId"
                element={<Nft setLoading={setLoading} />}
              />
            </>
          )}
        </Routes>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#00000052",
              zIndex: 1000,
            }}
          >
            <Loading size="xl" />
          </div>
        )}
        <Toaster />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
