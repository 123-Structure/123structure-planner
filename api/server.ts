import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import projectsRouter from "./src/routes/projects.route";
import customersRouter from "./src/routes/customers.route";
import chalk from "chalk";

dotenv.config();

// Express App
const app: Express = express();
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI as string;

// Middleware
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  const reqColor = (method: string, path: string) => {
    if (path.includes("/search/")) {
      return "bgMagenta";
    }
    switch (method) {
      case "GET":
        return "bgCyan";
      case "POST":
        return "bgGreen";
      case "DELETE":
        return "bgRed";
      case "PATCH":
        return "bgYellow";
      default:
        return "bgWhite";
    }
  };

  console.log(chalk[reqColor(req.method, req.path)](req.method, req.path));
  next();
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "🌍 Welcome to the app !" });
});

app.use("/api/projects", projectsRouter);
app.use("/api/customers", customersRouter);

// Connect to database
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    // Listen requests
    app.listen(port, () => {
      console.log(chalk.yellow("📂[mongodb]: Connected to database"));
      console.log(
        chalk.yellow(
          `⚡️[server]: Server is running at http://localhost:${port}`
        )
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
