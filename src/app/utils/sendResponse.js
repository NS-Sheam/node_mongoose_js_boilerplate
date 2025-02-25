const sendResponse = (res, data) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data?.meta,
    data: data.data,
  });
};

export default sendResponse;
