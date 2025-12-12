import { useState } from "react";
import {
  MdAttachMoney,
  MdInventory,
  MdOutlineCalculate,
  MdCalendarToday,
} from "react-icons/md";
import { newspaperSimulation } from "../component/Newspaper/NewsLogic.jsx";
import NewsTable from "../component/Newspaper/NewsTable.jsx";

const Newspaper = () => {
  const [data, setData] = useState([]);
  const [stock, setStock] = useState("");
  const [buyingPrice, setBuyingPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [days, setDays] = useState("");

  const handleSimulateDay = () => {
    if (!stock || !buyingPrice || !sellingPrice) {
      alert("Fill Stock, Buying Price & Selling Price & Days first");
      return;
    }

    const dayCount = Number(days);
    const newData = [];

    for (let i = 1; i <= dayCount; i++) {
      newData.push(
        newspaperSimulation(stock, sellingPrice, buyingPrice, i)
      );
    }
    
    // setData((prev) => [...prev, ...newData]);
    setData(newData)
  };

  // --- Summary calculations ---
  const totalDays = data.length;
  const totalRevenue = data.reduce((sum, day) => sum + day.revenue, 0);
  const totalLostProfit = data.reduce((sum, day) => sum + day.lostProfit, 0);
  const totalSalvage = data.reduce((sum, day) => sum + day.salvage, 0);
  const avgDailyProfit =
    totalDays > 0
      ? data.reduce((sum, day) => sum + day.dailyProfit, 0) / totalDays
      : 0;

  return (
    <main className="main-content" style={{ padding: "20px" }}>
      {/* --- Input Bar --- */}
      <div
        className="controls"
        style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
      >
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Buying Price"
          value={buyingPrice}
          onChange={(e) => setBuyingPrice(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Selling Price"
          value={sellingPrice}
          onChange={(e) => setSellingPrice(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSimulateDay} style={buttonStyle}>
          Generate
        </button>
      </div>

      {/* --- Summary --- */}
      {totalDays > 0 && (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px 20px",
            background: "#f7f7f7",
            borderRadius: "10px",
            boxShadow: "0 0 8px rgba(0,0,0,0.1)",
            fontSize: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {/* Number of days */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <MdCalendarToday size={24} color="#007acc" />
            <strong>Number of days:</strong> {totalDays}
          </div>

          {/* Row 1: Total Revenue | Total Lost Profit */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MdAttachMoney size={24} color="#28a745" />
              <strong>Total Revenue after {totalDays} days:</strong> $
              {totalRevenue.toFixed(2)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MdAttachMoney size={24} color="#f44336" />
              <strong>Total Lost Profit after {totalDays} days:</strong> $
              {totalLostProfit.toFixed(2)}
            </div>
          </div>

          {/* Row 2: Total Salvage | Average Daily Profit */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MdInventory size={24} color="#2196f3" />
              <strong>Total Salvage after {totalDays} days:</strong> $
              {totalSalvage.toFixed(2)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MdOutlineCalculate size={24} color="#9c27b0" />
              <strong>Average Daily Profit {totalDays} days:</strong> $
              {avgDailyProfit.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      {/* --- Simulation Table --- */}
      <NewsTable data={data} />
    </main>
  );
};

export default Newspaper;

// --- Input & Button Styles ---
const inputStyle = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  width: "140px",
};

const buttonStyle = {
  backgroundColor: "#007acc",
  cursor: "pointer",
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "8px 18px",
  fontSize: "1rem",
};
