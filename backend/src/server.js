import cors from 'cors'
import dotenv from "dotenv";
import express from "express";

import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import ratelimiter from "../middleware/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// middleware
app.use(cors()) //the backend accepts any request from any origin
app.use(express.json()); //this middleware will parse JSON bodies: req.bdy
app.use(ratelimiter); // limiting request per user 

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server is running is Port: ", port);
  });
});
