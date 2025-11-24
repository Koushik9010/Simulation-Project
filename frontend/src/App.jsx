import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import Single from "./pages/Single";

const App = () => {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Single />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
