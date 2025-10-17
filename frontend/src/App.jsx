import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Table from "./component/table";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Table />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
