import React, { useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/PieChart.css";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [month, setMonth] = useState(1); // Default month
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPieChartData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/transactions/pie-chart?month=${month}`);
      console.log("API Response:", response.data);

      const data = response.data;

      if (!data || Object.keys(data).length === 0) {
        console.warn("No data received!");
        setChartData(null);
      } else {
        setChartData({
          labels: Object.keys(data),
          datasets: [
            {
              label: "Category Distribution",
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              data: Object.values(data),
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pie-chart">
      <h3>Category Distribution</h3>
      <div>
        <input
          type="number"
          min="1"
          max="12"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Enter month (1-12)"
        />
        <button onClick={fetchPieChartData}>Submit</button>
      </div>
      {loading ? <p>Loading...</p> : chartData ? <Pie data={chartData} /> : <p>No data available</p>}
    </div>
  );
};

export default PieChart;
