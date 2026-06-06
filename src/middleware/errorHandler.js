const errorHandler = (err, req, res, next) => {
  // Log full error for debugging (server side only)
  console.error("Server Error:", err);

  // Default status code
  const statusCode = err.statusCode || 500;

  // Check environment
  const isDev = process.env.NODE_ENV === "development";

  // Ensure safe values are always passed to EJS
  const errorData = isDev ? err : {};

  res.status(statusCode).render("500", {
    title: "Server Error",
    message: isDev ? err.message : "Something went wrong",
    error: errorData
  });
};

export default errorHandler;