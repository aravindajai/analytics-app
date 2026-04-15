import axios from "axios";

const API = "http://localhost:8000/api";

export const fetchAnalytics = (start, end) =>
  axios.get(`${API}/analytics`, {
    params: { start, end },
  });

export const exportCSV = () =>
  window.open(`${API}/export`);