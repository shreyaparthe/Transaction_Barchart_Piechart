import axios from "axios";

const API_BASE_URL = "http://localhost:8080/transactions"; // Update if needed

export const fetchTransactions = (month, search, page, size) => {
  return axios.get(`${API_BASE_URL}?month=${month}&search=${search}&page=${page}&size=${size}`);
};

export const fetchStatistics = (month) => {
  return axios.get(`${API_BASE_URL}/statistics?month=${month}`);
};

export const fetchBarChartData = (month) => {
  return axios.get(`${API_BASE_URL}/bar-chart?month=${month}`);
};

export const fetchPieChartData = (month) => {
  return axios.get(`${API_BASE_URL}/pie-chart?month=${month}`);
};

export const fetchCombinedData = (month) => {
  return axios.get(`${API_BASE_URL}/combined?month=${month}`);
};
