const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(express.json());

// Route imports
const productsRouter = require('./routes/products');

// Mount routes
app.use('/api/products', productsRouter);

// Catch-all unknown routes
app.all('*', (req, _, next) => {
  const AppError = require('./utils/AppError');
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Error handler
app.use(errorHandler);

app.listen(5000, () => console.log('Server running on port 5000'));
