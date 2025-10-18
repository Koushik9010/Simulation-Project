import { useEffect, useRef, useState } from "react";
import { generateNextCustomer } from "../component/logic";
import "../component/table.css";

const Dynamic = () => {
  const [data, setData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const timeRef = useRef(null);

  // function to start dynamic simulation
  const startSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);

    const addCustomer = () => {
      setData((prev) => [...prev, generateNextCustomer(prev)]);
      const nextDelay = Math.floor(Math.random() * 8000) + 2000; // 2 to 10 seconds
      timeRef.current = setTimeout(addCustomer, nextDelay);
    };

    addCustomer();
  };

  // function to stop dynamic simulation
  const stopSimulation = () => {
    setIsRunning(false);
    clearTimeout(timeRef.current);
  };

  // clean up on unmount
  useEffect(() => {
    return () => clearTimeout(timeRef.current);
  }, []);

  return (
    <main className="main-content">
      <div className="controls">
        <button
          onClick={startSimulation}
          disabled={isRunning}
          style={{
            backgroundColor: isRunning ? "#a5d6a7" : "#28a745", // lighter green when disabled
            cursor: isRunning ? "not-allowed" : "pointer",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 18px",
            transition: "0.3s",
          }}
        >
          Start Dynamic Simulation
        </button>
        <button
          onClick={stopSimulation}
          disabled={!isRunning}
          style={{
            backgroundColor: !isRunning ? "#f5b6b6" : "#d9534f", // lighter red when disabled
            cursor: !isRunning ? "not-allowed" : "pointer",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 18px",
            transition: "0.3s",
          }}
        >
          Stop Dynamic Simulation
        </button>
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
                  No simulation data yet. Click "Start Dynamic Simulation".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Dynamic;
