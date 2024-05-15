import config from "../config/index.js";

const globalErrorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  let errorSource = [
    {
      path: "",
      message,
    },
  ];
  return res.status(status).json({
    success: false,
    message,
    errorSource,
    stack: config.node_env === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
