const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.get('/api/data', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json(result.rows);
});

app.listen(5000, () => console.log('Server running on port 5000'));
