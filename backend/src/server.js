import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import path from "path";

import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import ratelimiter from "../middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV === "production") {
  app.use(cors({
    origin: "http://localhost:5173"
  })); //the backend accepts any request from any origin
}
app.use(express.json()); //this middleware will parse JSON bodies: req.bdy
app.use(ratelimiter); // limiting request per user

app.use("/api/notes", noteRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server is running is Port: ", port);
  });
});
