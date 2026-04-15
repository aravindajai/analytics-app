import { useEffect, useState } from "react";
import { fetchAnalytics, exportCSV } from "./services/api";
import {
  LineChart, Line, XAxis, YAxis,
  BarChart, Bar,
  AreaChart, Area,
  Tooltip
} from "recharts";

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
        console.log("API RESPONSE:", res);        // 👈 ADD THIS
        console.log("DATA:", res.data);           // 👈 ADD THIS
    
        if (isMounted) {
          setData(res.data);
        }
      } catch (err) {
        console.error("ERROR:", err);
      }
    };
  
    fetchData();
  
    const interval = setInterval(fetchData, 60000);
  
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [start, end]);
  if (!data) return <div>Loading...</div>;

  return (
    <div style={{
      background: dark ? "#111" : "#fff",
      color: dark ? "#fff" : "#000",
      minHeight: "100vh",
      padding: "20px"
    }}>

      <h1>Analytics Dashboard</h1>

      {/* Toggle */}
      <button onClick={() => setDark(!dark)}>
        Toggle Theme
      </button>

      {/* Filters */}
      <div>
        <input type="date" onChange={e => setStart(e.target.value)} />
        <input type="date" onChange={e => setEnd(e.target.value)} />
        <button onClick={loadData}>Apply</button>
      </div>

      {/* Export */}
      <button onClick={exportCSV}>Export CSV</button>

      {/* KPI */}
      <h2>Total Sales: {data.total_sales}</h2>
      <h2>Total Leads: {data.total_leads}</h2>

      {/* Daily */}
      <h3>Daily</h3>
      <LineChart width={500} height={300} data={data.daily}>
        <Line dataKey="sales" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>

      {/* Weekly */}
      <h3>Weekly</h3>
      <BarChart width={500} height={300} data={data.weekly}>
        <Bar dataKey="sales" />
        <XAxis dataKey="week" />
        <YAxis />
        <Tooltip />
      </BarChart>

      {/* Monthly */}
      <h3>Monthly</h3>
      <AreaChart width={500} height={300} data={data.monthly}>
        <Area dataKey="sales" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
      </AreaChart>

    </div>
  );
}

export default App;