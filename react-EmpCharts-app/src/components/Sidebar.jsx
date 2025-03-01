import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import Statistics from "./Statistics";
import TransactionTable from "./TransactionTable";
import Dashboard from "./Dashboard"
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/transactions">Transaction Table</Link></li>
            <li><Link to="/barchart">Bar Chart</Link></li>
            <li><Link to="/piechart">Pie Chart</Link></li>
            <li><Link to="/statistics">Statistics</Link></li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/transactions" element={<TransactionTable />} />
            <Route path="/barchart" element={<BarChart />} />
            <Route path="/piechart" element={<PieChart />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Sidebar;
