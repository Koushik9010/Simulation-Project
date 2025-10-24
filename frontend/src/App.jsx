import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Dynamic from "./pages/Dynamic";

const App = () => {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Dynamic />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
