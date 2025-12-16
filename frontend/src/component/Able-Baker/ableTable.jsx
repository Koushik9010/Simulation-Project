import { useState } from "react";
import {
  MdAccessTime,
  MdPerson,
  MdTimer,
  MdSpeed,
  MdAvTimer,
} from "react-icons/md";

const AbleBakerTable = ({
  data,
  summary,
  selectedDate,
  isViewingSavedData,
}) => {
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
                  <b>Avg IAT:</b> {summary.avgIAT}
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
                <MdSpeed size={24} color="#9c27b0" />
                <span>
                  <b>Avg Service Time for Able:</b> {summary.avgAbleServiceTime}
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
                  <b>Avg Service Time for Baker:</b>{summary.avgBakerServiceTime}
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
                  <b>Avg Wait (Those Who Wait):</b>{summary.avgWaitingForThoseWhoWait}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <table className="sim-table">
        <thead>
          <tr>
            <th rowSpan="2">Customer</th>
            <th rowSpan="2">RV (ST)</th>
            <th rowSpan="2">RV (AT)</th>
            <th rowSpan="2">IAT</th>
            <th rowSpan="2">AT</th>

            <th colSpan="3">Able</th>
            <th colSpan="3">Baker</th>

            <th rowSpan="2">Caller Delay</th>
            <th rowSpan="2">TSS</th>
          </tr>
          <tr>
            <th>TSB</th>
            <th>ST</th>
            <th>TSE</th>

            <th>TSB</th>
            <th>ST</th>
            <th>TSE</th>
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.customer}>
                <td>{row.customer}</td>
                <td>{row.rvST}</td>
                <td>{row.rvAT}</td>
                <td>{row.IAT}</td>
                <td>{row.AT}</td>

                <td>{row.ableTSB}</td>
                <td>{row.ableST}</td>
                <td>{row.ableTSE}</td>

                <td>{row.bakerTSB}</td>
                <td>{row.bakerST}</td>
                <td>{row.bakerTSE}</td>

                <td>{row.callerDelay}</td>
                <td>{row.TSS}</td>
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

export default AbleBakerTable;
