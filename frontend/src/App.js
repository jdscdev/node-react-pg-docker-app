import React, { useEffect, useState } from 'react';
import './css/App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(data => setData(data[0]));
  }, []);

  return (
    <div className="App">
      <h1>React + Node + PostgreSQL</h1>
      <p>Data from server: {data ? JSON.stringify(data) : 'Loading...'}</p>
    </div>
  );
}

export default App;
