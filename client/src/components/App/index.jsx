import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import About from "./About";
import { Container } from "@nextui-org/react";
import FAQ from "./FAQ";
import Footer from "./Footer";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Container lg css={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
