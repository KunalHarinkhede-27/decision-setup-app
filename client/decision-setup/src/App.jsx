import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KPIChart from './components/kpichart.jsx';

function App() {
  const [kpis, setKpis] = useState([]);
  const [form, setForm] = useState({ title: '', value: 0, category: '' });
  const [filter, setFilter] = useState('');

  const fetchKpis = () => {
    const url = filter ? `http://localhost:5000/api/kpis?category=${filter}` : `http://localhost:5000/api/kpis`;
    axios.get(url).then(res => setKpis(res.data));
  };

  useEffect(() => {
    fetchKpis();
    const interval = setInterval(fetchKpis, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [filter]);

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/kpis/create', form).then(() => {
      fetchKpis();
      setForm({ title: '', value: 0, category: '' });
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📊 Decision Support Dashboard</h1>

      <div className="mb-4">
        <input className="p-2 border mr-2" placeholder="Filter by Category"
          onChange={(e) => setFilter(e.target.value)} />
        <button onClick={fetchKpis} className="bg-blue-500 text-white p-2 rounded">Apply</button>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold text-lg">➕ Add KPI</h2>
        <input className="p-2 border mr-2" placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input className="p-2 border mr-2" type="number" placeholder="Value"
          value={form.value}
          onChange={(e) => setForm({ ...form, value: Number(e.target.value) })} />
        <input className="p-2 border mr-2" placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <button onClick={handleSubmit} className="bg-green-600 text-white p-2 rounded">Add</button>
      </div>

      <KPIChart data={kpis} />
    </div>
  );
}

export default App;
