/**
 * Error Handling Middleware
 * Provides an async route wrapper and centralised error handler.
 */

/**
 * Wraps an async route handler so thrown errors flow to Express error middleware.
 * Eliminates try/catch boilerplate in every controller.
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Centralised error-handling middleware.
 * Maps known database errors to appropriate HTTP status codes.
 */
export const errorHandler = (err, _req, res, _next) => {
  console.error(`[Error] ${err.message}`);

  /* Database unreachable */
  if (
    err.code === "ServiceUnavailable" ||
    err.code === "SessionExpired" ||
    err.message.includes("connect")
  ) {
    return res.status(503).json({
      error: "Database unreachable",
      message:
        "The graph database is currently unavailable. Please try again later.",
    });
  }

  /* Fallback */
  const status = err.statusCode || 500;
  return res.status(status).json({
    error: err.name || "Internal server error",
    message: err.message,
  });
};
