import { useEffect, useRef, useState } from "react";
import { runAbleBaker, calculateSummary } from "../component/Able-Baker/ableLogic.jsx";
import AbleBakerTable from "../component/Able-Baker/ableTable.jsx";
// import "../component/Single-Server/table.css";

const AbleBaker = () => {
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
        const updated = [...prev, runAbleBaker(prev)];
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

  // summary section
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
      </div>

      <AbleBakerTable
        data={data}
        summary={summary}
        selectedDate={selectedDate}
        isViewingSavedData={isViewingSavedData}
      />
    </main>
  );
};

export default AbleBaker;
