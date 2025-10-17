import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Table from "./component/table";

const App = () => {
  return (
    <>
      <div className="app">
        <Routes>
          <Route path="/" element={<Table />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
