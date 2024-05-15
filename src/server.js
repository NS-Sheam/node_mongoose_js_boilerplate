import mongoose from "mongoose";
import app from "./app.js";
import config from "./app/config/index.js";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFoundRoutes.js";

let server;

async function main() {
  try {
    await mongoose.connect(config.database_url);
    server = app.listen(config.port, () => {
      console.log(`Server running at port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
main();

app.use(globalErrorHandler);
app.use(notFound);

process.on("unhandledRejection", (error, promise) => {
  console.log(
    "❌ Shutting down the server due to unhandled rejection at:",
    promise,
    "with reason:",
    error
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on("uncaughtException", (error) => {
  console.log(
    "❌ Shutting down the server due to uncaught exception with reason:",
    error
  );
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});
