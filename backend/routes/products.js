// backend/routes/products.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// GET all products
router.get('/', catchAsync(async (_, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
}));

// POST a new product
router.post('/', catchAsync(async (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    throw new AppError('Name and price are required', 400);
  }
  
  const result = await pool.query(
    'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
    [name, price]
  );
  res.json(result.rows[0]);
}));

// PUT a product
router.put('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const result = await pool.query(
    'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
    [name, price, id]
  );
  res.json(result.rows[0]);
}));

// DELETE a product
router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  res.sendStatus(204);
}));

module.exports = router;
