import React, { useState } from "react";
import axios from "axios";
import "../styles/TransactionsTable.css";

const TransactionTable = () => {
  const [month, setMonth] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    if (!month) {
      alert("Please enter a month");
      return;
    }
  
    setLoading(true);
  
    const encodedSearchTerm = encodeURIComponent(searchTerm.trim()); // Trim & encode input
  
    try {
      console.log(`Fetching: http://localhost:8080/transactions?month=${month}&search=${encodedSearchTerm}&page=1&size=10`);
      
      const response = await axios.get(`http://localhost:8080/transactions`, {
        params: { month, search: encodedSearchTerm, page: 1, size: 10 },
      });
  
      console.log("API Response:", response.data);
      setTransactions(response.data.content);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  
    setLoading(false);
  };
  

  return (
    <div className="transactions-table">
      <h2>Transaction Table</h2>
      <div className="filters">
        <input
          type="number"
          placeholder="Enter month (1-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          min="1"
          max="12"
        />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchTransactions}>Submit</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Date of Sale</th>
            
            <th>Image</th>
            <th>Price</th>
            <th>Sold</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="8">Loading...</td></tr>
          ) : transactions.length > 0 ? (
            transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.category}</td>
                <td>{tx.dateOfSale}</td>
                
                <td>
                  <img src={tx.image} alt={tx.title} width="50" height="50" />
                </td>
                <td>${tx.price}</td>
                <td>{tx.sold ? "Yes" : "No"}</td>
                <td>{tx.title}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="8">No transactions available</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
