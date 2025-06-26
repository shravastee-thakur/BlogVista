import express from "express";
import cors from "cors";

const app = express();

import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import commentRoute from "./routes/commentRoute.js";

import cookieParser from "cookie-parser";

//Middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/v1/user", userRoute);
// http://localhost:5000/api/v1/user/register

app.use("/api/v1/post", postRoute);
// http://localhost:5000/api/v1/post/createPost

app.use("/api/v1/comment", commentRoute);
// http://localhost:5000/api/v1/comment/createComment

export default app;
