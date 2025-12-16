import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Single from "./pages/Single";
import Newspaper from "./pages/Newspaper";
import AbleBaker from "./pages/ableBaker";

const App = () => {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Single />} />
        <Route path="/newspaper" element={<Newspaper />} />
        <Route path="/able-baker" element={<AbleBaker />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
