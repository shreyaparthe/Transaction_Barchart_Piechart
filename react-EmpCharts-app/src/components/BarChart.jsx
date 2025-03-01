import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "../styles/BarChart.css";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [month, setMonth] = useState(1); // Default month
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);

  const fetchBarChartData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/transactions/bar-chart?month=${month}`);
      const data = response.data;

      setChartData({
        labels: Object.keys(data),
        datasets: [
          {
            label: "Number of Transactions",
            data: Object.values(data),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching bar chart data", error);
      setChartData({ labels: [], datasets: [] }); // Reset chart data on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "500px", height: "300px" }} className="Barchart">
      <h3>Transaction Price Ranges</h3>
      <div >
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Enter month (1-12)"
        />
        <button onClick={fetchBarChartData}>Submit</button>
      </div>
      {loading ? <p>Loading...</p> : chartData.labels.length ? <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} /> : <p>No data available</p>}
    </div>
  );
};

export default BarChart;
