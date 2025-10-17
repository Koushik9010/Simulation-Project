// src/components/table.jsx
import React, { useState } from "react";
import { runSimulation } from "./logic";

const Table = () => {
  const [data, setData] = useState([]);
  const [numCustomers, setNumCustomers] = useState(10); // default 10

  const handleSimulation = () => {
    const result = runSimulation(Number(numCustomers));
    setData(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Single Server Simulation Table</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>
          Number of Customers:{" "}
          <input
            type="number"
            value={numCustomers}
            onChange={(e) => setNumCustomers(e.target.value)}
            min="1"
            style={{ width: "80px", marginRight: "10px" }}
          />
        </label>
        <button onClick={handleSimulation}>Run Simulation</button>
      </div>

      {data.length > 0 && (
        <table
          border="1"
          cellPadding="6"
          style={{ marginTop: "10px", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Customer</th>
              <th>R.V. for Arrival Time</th>
              <th>Inter Arrival Time</th>
              <th>Arrival Time</th>
              <th>R.V. for Service Time</th>
              <th>Service Time</th>
              <th>Time Service Begins</th>
              <th>Waiting Time</th>
              <th>Time Service Ends</th>
              <th>Time Spent in System</th>
              <th>Idle Time of Server</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({
                customer,
                rvAT,
                IAT,
                AT,
                rvST,
                ST,
                TSB,
                WT,
                TSE,
                TSS,
                IOS,
              }) => (
                <tr key={customer}>
                  <td>{customer}</td>
                  <td>{rvAT}</td>
                  <td>{IAT}</td>
                  <td>{AT}</td>
                  <td>{rvST}</td>
                  <td>{ST}</td>
                  <td>{TSB}</td>
                  <td>{WT}</td>
                  <td>{TSE}</td>
                  <td>{TSS}</td>
                  <td>{IOS}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
