const notFound = (req, res, next) => {
  const success = false;
  const status = 404;
  const message = `Requested path ${req.originalUrl} Not Found`;
  res.status(status).json({
    status,
    success,
    message,
  });
};

export default notFound;
