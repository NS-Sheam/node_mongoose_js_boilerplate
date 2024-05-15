//app.ts
import express from "express";

import cors from "cors";
import router from "./app/routes/index.js";

const app = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API",
  });
});

export default app;
