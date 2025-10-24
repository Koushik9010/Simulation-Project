import { useEffect, useRef, useState } from "react";
import { runSimulation } from "../component/logic";
import "../component/table.css";

const Dynamic = () => {
  const [data, setData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const timeRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];

  // ✅ Load saved date/data
  useEffect(() => {
    const lastDate = localStorage.getItem("lastSelectedDate");
    if (lastDate) {
      setSelectedDate(lastDate);
      const savedData = localStorage.getItem(`simData-${lastDate}`);
      if (savedData) setData(JSON.parse(savedData));
    }
  }, []);

  // ✅ Handle date change
  useEffect(() => {
    if (!selectedDate) return;
    localStorage.setItem("lastSelectedDate", selectedDate);

    const saved = localStorage.getItem(`simData-${selectedDate}`);
    setData(saved ? JSON.parse(saved) : []);
  }, [selectedDate]);

  // ✅ Auto-save data
  useEffect(() => {
    if (selectedDate)
      localStorage.setItem(`simData-${selectedDate}`, JSON.stringify(data));
  }, [data, selectedDate]);

  // ✅ Start Simulation
  const startSimulation = () => {
    if (!selectedDate) {
      alert("Please select a date before starting the simulation!");
      return;
    }
    if (isRunning) return;
    setIsRunning(true);

    const addCustomer = () => {
      setData((prev) => {
        const updated = [...prev, runSimulation(prev)];
        localStorage.setItem(
          `simData-${selectedDate}`,
          JSON.stringify(updated)
        );
        return updated;
      });
      const nextDelay = Math.floor(Math.random() * 8000) + 2000;
      timeRef.current = setTimeout(addCustomer, nextDelay);
    };
    addCustomer();
  };

  // ✅ Stop Simulation
  const stopSimulation = () => {
    setIsRunning(false);
    clearTimeout(timeRef.current);
  };

  useEffect(() => () => clearTimeout(timeRef.current), []);

  // ✅ Download CSV
  const downloadCSV = () => {
    if (!selectedDate || data.length === 0) {
      alert("No data available for download.");
      return;
    }

    const headers = [
      "Customer",
      "RV (A.T)",
      "IAT",
      "AT",
      "RV (S.T)",
      "ST",
      "TSB",
      "WT",
      "TSE",
      "TSS",
      "IOS",
    ];

    const rows = data.map((row) =>
      [
        row.customer,
        row.rvAT,
        row.IAT,
        row.AT,
        row.rvST,
        row.ST,
        row.TSB,
        row.WT,
        row.TSE,
        row.TSS,
        row.IOS,
      ].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `DynamicSim_${selectedDate}.csv`;
    link.click();
  };

  // ✅ Derived calculations
  const calcSummary = () => {
    if (data.length === 0) return null;

    const WT = data.map((d) => d.WT || 0);
    const ST = data.map((d) => d.ST || 0);
    const IAT = data.map((d) => d.IAT || 0);
    const IOS = data.map((d) => d.IOS || 0);
    const TSS = data.map((d) => d.TSS || 0);
    const TSE = data.map((d) => d.TSE || 0);

    const n = data.length;
    const totalWT = WT.reduce((a, b) => a + b, 0);
    const totalST = ST.reduce((a, b) => a + b, 0);
    const totalIAT = IAT.reduce((a, b) => a + b, 0);
    const totalIOS = IOS.reduce((a, b) => a + b, 0);
    const totalTSS = TSS.reduce((a, b) => a + b, 0);
    const waited = WT.filter((w) => w > 0).length;
    // const lastTSS = TSS[TSS.length - 1] || 0;
    const lastTSE = TSE[TSE.length - 1] || 0;

    return {
      avgWaitingTime: (totalWT / n).toFixed(2),
      probWait: (waited / n).toFixed(2),
      probIdle: lastTSE ? (totalIOS / lastTSE).toFixed(2) : "0.00",
      avgServiceTime: (totalST / n).toFixed(2),
      avgTimeBetweenArrival: n > 1 ? (totalIAT / (n - 1)).toFixed(2) : "0.00",
      avgWaitingForThoseWhoWait:
        waited > 0 ? (totalWT / waited).toFixed(2) : "0.00",
      avgTimeInSystem: (totalTSS / n).toFixed(2),
    };
  };

  const summary = calcSummary();

  const isViewingSavedData =
    selectedDate && new Date(selectedDate) < new Date(today);

  return (
    <main className="main-content">
      {/* === Controls === */}
      <div className="controls">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          disabled={isRunning}
          max={today}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />

        <button
          onClick={startSimulation}
          disabled={isRunning || !selectedDate || isViewingSavedData}
          style={{
            backgroundColor:
              !selectedDate || isRunning || isViewingSavedData
                ? "#a5d6a7"
                : "#28a745",
            cursor:
              !selectedDate || isRunning || isViewingSavedData
                ? "not-allowed"
                : "pointer",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 18px",
          }}
        >
          Start Simulation
        </button>

        <button
          onClick={stopSimulation}
          disabled={!isRunning || isViewingSavedData}
          style={{
            backgroundColor:
              !isRunning || isViewingSavedData ? "#f5b6b6" : "#d9534f",
            cursor:
              !isRunning || isViewingSavedData ? "not-allowed" : "pointer",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 18px",
          }}
        >
          Stop Simulation
        </button>

        <button
          onClick={downloadCSV}
          disabled={!selectedDate || data.length === 0}
          style={{
            backgroundColor:
              !selectedDate || data.length === 0 ? "#b3d1f0" : "#007acc",
            cursor:
              !selectedDate || data.length === 0 ? "not-allowed" : "pointer",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 18px",
          }}
        >
          Download CSV
        </button>
      </div>

      {/* === Table === */}
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
                  {selectedDate
                    ? isViewingSavedData
                      ? "Viewing saved data from a previous date."
                      : "No data yet. Click 'Start Simulation' to begin."
                    : "Select a date to start simulation."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* === Summary === */}
      {summary && (
        <div
          style={{
            marginTop: "20px",
            background: "#f7f7f7",
            borderRadius: "10px",
            padding: "15px",
            width: "fit-content",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "10px" }}>Summary Calculations</h3>
          <ul style={{ lineHeight: "1.8", listStyle: "none", paddingLeft: 0 }}>
            <li>
              1️⃣ Average Waiting Time: <b>{summary.avgWaitingTime}</b>
            </li>
            <li>
              2️⃣ Probability Customer Waits: <b>{summary.probWait}</b>
            </li>
            <li>
              3️⃣ Probability of Idle Time: <b>{summary.probIdle}</b>
            </li>
            <li>
              4️⃣ Average Service Time: <b>{summary.avgServiceTime}</b>
            </li>
            <li>
              5️⃣ Avg Time Between Arrivals:{" "}
              <b>{summary.avgTimeBetweenArrival}</b>
            </li>
            <li>
              6️⃣ Avg Wait (Only Those Who Wait):{" "}
              <b>{summary.avgWaitingForThoseWhoWait}</b>
            </li>
            <li>
              7️⃣ Avg Time in System: <b>{summary.avgTimeInSystem}</b>
            </li>
          </ul>
        </div>
      )}
    </main>
  );
};

export default Dynamic;
