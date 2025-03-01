import React, { useState } from "react";
import axios from "axios";
import "../styles/Statistics.css";

const Statistics = () => {
  const [month, setMonth] = useState(1); // Default month
  const [stats, setStats] = useState({ totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/transactions/statistics?month=${month}`);
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching statistics", error);
      setError("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="statistics">
      <h3>Statistics</h3>
      <div>
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Enter month (1-12)"
        />
        <button onClick={fetchStatistics}>Submit</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="State">
          <div>Total Sales Amount: ${stats.totalSaleAmount.toFixed(2)}</div>
          <div>Total Sold Items: {stats.totalSoldItems}</div>
          <div>Total Not Sold Items: {stats.totalNotSoldItems}</div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
