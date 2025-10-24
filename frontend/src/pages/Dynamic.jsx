import { useEffect, useRef, useState } from "react";
import { runSimulation, calculateSummary } from "../component/logic";
import Table from "../component/table";
import "../component/table.css";

const Dynamic = () => {
  const [data, setData] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const timeRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];

  // Load saved data
  useEffect(() => {
    const lastDate = localStorage.getItem("lastSelectedDate");
    if (lastDate) {
      setSelectedDate(lastDate);
      const savedData = localStorage.getItem(`simData-${lastDate}`);
      if (savedData) setData(JSON.parse(savedData));
    }
  }, []);

  // When date changes
  useEffect(() => {
    if (!selectedDate) return;
    localStorage.setItem("lastSelectedDate", selectedDate);

    const saved = localStorage.getItem(`simData-${selectedDate}`);
    setData(saved ? JSON.parse(saved) : []);
  }, [selectedDate]);

  // Auto-save
  useEffect(() => {
    if (selectedDate)
      localStorage.setItem(`simData-${selectedDate}`, JSON.stringify(data));
  }, [data, selectedDate]);

  // Start simulation
  const startSimulation = () => {
    if (!selectedDate) {
      alert("Please select a date before starting!");
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

  // Stop simulation
  const stopSimulation = () => {
    setIsRunning(false);
    clearTimeout(timeRef.current);
  };

  useEffect(() => () => clearTimeout(timeRef.current), []);

  // Download CSV
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

  const summary = calculateSummary(data);
  const isViewingSavedData =
    selectedDate && new Date(selectedDate) < new Date(today);

  return (
    <main className="main-content">
      {/* Controls */}
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

      {/* Table + Summary */}
      <Table
        data={data}
        summary={summary}
        selectedDate={selectedDate}
        isViewingSavedData={isViewingSavedData}
      />
    </main>
  );
};

export default Dynamic;
