// frontend/App.jsx
import React, { useState } from 'react';
import './App.css';

function App() {
  const [hash, setHash] = useState('');
  const [log, setLog] = useState(null);
  const [error, setError] = useState(null);

  const fetchLog = async () => {
    try {
      const response = await fetch(`/api/logs/${hash}`);
      if (!response.ok) throw new Error("Log not found");
      const data = await response.json();
      setLog(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setLog(null);
    }
  };

  return (
    <div className="App">
      <h1>Blockchain Log Viewer</h1>
      <input
        type="text"
        value={hash}
        onChange={(e) => setHash(e.target.value)}
        placeholder="Enter Log Hash"
      />
      <button onClick={fetchLog}>Fetch Log</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {log && (
        <div className="log-card">
          <h3>Log Details</h3>
          <p><strong>Timestamp:</strong> {log.timestamp}</p>
          <p><strong>Source IP:</strong> {log.source_ip}</p>
          <p><strong>Destination IP:</strong> {log.destination_ip}</p>
          <p><strong>Alert Type:</strong> {log.alert_type}</p>
          <pre>{log.log_data}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
