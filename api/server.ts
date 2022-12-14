import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import projectsRouter from "./routes/projects";

dotenv.config();

// Express App
const app: Express = express();
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI as string;

// Middleware
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "🌍 Welcome to the app !" });
});

app.use("/api/projects", projectsRouter);

// Connect to database
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    // Listen requests
    app.listen(port, () => {
      console.log("📂[mongodb]: Connected to database");
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
