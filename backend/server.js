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

app.get('/api/products', async (req, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
});

app.post('/api/products', async (req, res) => {
  const { name, price } = req.body;
  const result = await pool.query(
    'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
    [name, price]
  );
  res.json(result.rows[0]);
});

app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const result = await pool.query(
    'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
    [name, price, id]
  );
  res.json(result.rows[0]);
});

app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  res.sendStatus(204);
});

app.listen(5000, () => console.log('Server running on port 5000'));
