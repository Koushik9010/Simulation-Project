import React, { useState } from "react";
import { runSimulation } from "./logic";
import "./table.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [numCustomers, setNumCustomers] = useState(10);

  const handleSimulation = () => {
    const result = runSimulation(Number(numCustomers));
    setData(result);
  };

  return (
    <main className="main-content">
      {/* Controls are now clearly under the header */}
      <div className="controls">
        <label>Number of Customers:</label>
        <input
          type="number"
          value={numCustomers}
          onChange={(e) => setNumCustomers(e.target.value)}
          min="1"
        />
        <button onClick={handleSimulation}>Run Simulation</button>
      </div>

      <div className="table-container">
        <table className="sim-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>RV (A.T)</th>
              <th>IAT</th>
              <th>AT</th>
              <th>RV (S.T)</th>
              <th>ST</th>
              <th>TSB</th>
              <th>WT</th>
              <th>TSE</th>
              <th>TSS</th>
              <th>IOS</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr key={row.customer}>
                  <td>{row.customer}</td>
                  <td>{row.rvAT}</td>
                  <td>{row.IAT}</td>
                  <td>{row.AT}</td>
                  <td>{row.rvST}</td>
                  <td>{row.ST}</td>
                  <td>{row.TSB}</td>
                  <td>{row.WT}</td>
                  <td>{row.TSE}</td>
                  <td>{row.TSS}</td>
                  <td>{row.IOS}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">
                  No simulation data yet. Click "Run Simulation".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Table;
