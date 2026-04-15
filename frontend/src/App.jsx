import { useEffect, useState } from "react";
import { fetchAnalytics, exportCSV } from "./services/api";
import {
  LineChart, Line, XAxis, YAxis,
  BarChart, Bar,
  AreaChart, Area,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [dark, setDark] = useState(false);

  const loadData = async () => {
    const res = await fetchAnalytics(start, end);
    setData(res.data);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await fetchAnalytics(start, end);
        if (isMounted) setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [start, end]);

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className={dark ? "app dark" : "app"}>

      {/* HEADER */}
      <div className="header">
        <h1>📊 Analytics Dashboard</h1>
        <button onClick={() => setDark(!dark)}>
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* FILTERS */}
      <div className="controls">
        <input type="date" onChange={e => setStart(e.target.value)} />
        <input type="date" onChange={e => setEnd(e.target.value)} />
        <button onClick={loadData}>Apply</button>
        <button onClick={exportCSV}>Export CSV</button>
      </div>

      {/* KPI CARDS */}
      <div className="kpi-container">
        <div className="card">
          <h3>Total Sales</h3>
          <p>{data.total_sales}</p>
        </div>
        <div className="card">
          <h3>Total Leads</h3>
          <p>{data.total_leads}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts">

        <div className="card">
          <h3>Daily Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.daily}>
              <Line type="monotone" dataKey="sales" stroke="#7c3aed" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Weekly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.weekly}>
              <Bar dataKey="sales" fill="#22c55e" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data.monthly}>
              <Area dataKey="sales" stroke="#3b82f6" fill="#93c5fd" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default App;