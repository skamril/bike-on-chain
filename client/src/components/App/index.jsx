import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import About from "./About";
import { Container } from "@nextui-org/react";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Certificates from "./Certificates";
import CreateCertificates from "./CreateCertificates";

function App() {
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
          <Route path="/my-certificates" element={<Certificates />} />
          <Route path="/create-certificates" element={<CreateCertificates />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
