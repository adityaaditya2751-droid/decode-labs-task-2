// Centralized error handler — the "circuit breaker" for unhandled errors.
// Keeps 500 responses consistent and prevents leaking stack traces to clients.

function notFoundHandler(req, res) {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found.` });
}

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal server error.",
  });
}

module.exports = { notFoundHandler, errorHandler };
