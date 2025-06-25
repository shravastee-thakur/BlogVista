import express from "express";
import cors from "cors";

const app = express();

import userRoute from "./routes/userRoute.js";

//Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/v1/user", userRoute);
// http://localhost:5000/api/v1/user/register

export default app;
