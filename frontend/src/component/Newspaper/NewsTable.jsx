const NewsTable = ({ data }) => {
  return (
    <div className="table-container">
      <table className="sim-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Random for newsday</th>
            <th>Type of newsday</th>
            <th>Random for demand</th>
            <th>Demand</th>
            <th>Revenue ($)</th>
            <th>Lost Profit ($)</th>
            <th>Salvage ($)</th>
            <th>Daily Profit ($)</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.day}>
                <td>{row.day}</td>
                <td>{row.rvType}</td>
                <td>{row.newsdayType}</td>
                <td>{row.rvDemand}</td>
                <td>{row.demand}</td>
                <td>{Number(row.revenue)?.toFixed(2)}</td>
                <td>{Number(row.lostProfit)?.toFixed(2)}</td>
                <td>{Number(row.salvage)?.toFixed(2)}</td>
                <td>{Number(row.dailyProfit)?.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center", padding: "15px" }}>
                No data yet. Start the simulation to generate results.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NewsTable;
