import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.route.js";
import artifactRoutes from "./routes/artifacts.route.js"
import cookieParser from "cookie-parser";
import { testing } from "./cron/testing.js";
import { draftCleanup } from "./cron/draftCleanup.js";
import webhook from "./webhook/webhook.js";
const app = express();
import comment from "./routes/comment.route.js";
/* Middlewares */
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// testing();
// draftCleanup();

app.use(cookieParser());
/* Test Route */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CMS Backend is running"
  });
});

import likeRoutes from "./routes/like.route.js";

app.use("/auth", authRoutes);
app.use("/artifacts", artifactRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", comment);

// normal endpoint no 
app.use("/webhook", webhook);
export default app;





// app.use(cors({
//   origin: ["https://cms-admin.vercel.app"],
//   credentials: true
// }));