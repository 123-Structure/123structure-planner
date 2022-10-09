import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import projectsRouter from "./routes/projects";

dotenv.config();

// Express App
const app: Express = express();
const port = process.env.PORT;

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

// Listen requests
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
