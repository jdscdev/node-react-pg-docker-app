module.exports = function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.name}: ${err.message}`);

  const status = err.statusCode || 500;

  res.status(status).json({
    status: 'error',
    statusCode: status,
    message: err.message || 'Internal Server Error',
  });
};
