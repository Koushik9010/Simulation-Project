import { useState } from "react";
import {
  MdAccessTime,
  MdPerson,
  MdTimer,
  MdSpeed,
  MdAvTimer,
} from "react-icons/md";
import "./table.css";

const Table = ({ data, summary, selectedDate, isViewingSavedData }) => {
  const [showSummary, setShowSummary] = useState(true);

  return (
    <div className="table-container">
      {/* === Collapsible Summary === */}
      {summary && (
        <div
          style={{
            marginBottom: "15px",
            marginTop: "15px",
            textAlign: "center",
          }}
        >
          <button
            onClick={() => setShowSummary(!showSummary)}
            style={{
              background: "#007acc",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            {showSummary ? "Hide Summary" : "Show Summary"}
          </button>

          {showSummary && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "15px",
                background: "#f7f7f7",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <div
                className="summary-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <MdAccessTime size={24} color="#28a745" />
                <span>
                  <b>Avg Waiting Time:</b> {summary.avgWaitingTime}
                </span>
              </div>
              <div
                className="summary-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <MdPerson size={24} color="#ff9800" />
                <span>
                  <b>Prob Customer Waits:</b> {summary.probWait}
                </span>
              </div>
              <div
                className="summary-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <MdTimer size={24} color="#f44336" />
                <span>
                  <b>Prob Idle Time:</b> {summary.probIdle}
                </span>
              </div>
              <div
                className="summary-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <MdSpeed size={24} color="#9c27b0" />
                <span>
                  <b>Avg Service Time:</b> {summary.avgServiceTime}
                </span>
              </div>
              <div
                className="summary-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <MdAvTimer size={24} color="#2196f3" />
                <span>
                  <b>Avg Time Between Arrivals:</b>{" "}
                  {summary.avgTimeBetweenArrival}
                </span>
              </div>
              <div
                className="summary-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <MdPerson size={24} color="#795548" />
                <span>
                  <b>Avg Wait (Those Who Wait):</b>{" "}
                  {summary.avgWaitingForThoseWhoWait}
                </span>
              </div>
              <div
                className="summary-item"
                style={{
                  gridColumn: "span 2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <MdTimer size={24} color="#00bcd4" />
                <span>
                  <b>Avg Time in System:</b> {summary.avgTimeInSystem}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* === Table === */}
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
  );
};

export default Table;
