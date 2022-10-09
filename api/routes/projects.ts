import express, { Request, Response } from "express";

const projectsRouter = express.Router();

// GET all projects
projectsRouter.get("/", (req: Request, res: Response) => {
  res.json({ msg: "✨ GET all projects" });
});

// GET a single project
projectsRouter.get("/:id", (req: Request, res: Response) => {
  res.json({ msg: "✨ GET a single project" });
});

// POST a new project
projectsRouter.post("/", (req: Request, res: Response) => {
  res.json({ msg: "✨ POST a new project" });
});

// DELETE a project
projectsRouter.delete("/:id", (req: Request, res: Response) => {
  res.json({ msg: "✨ DELETE a project" });
});

// UPDATE a project
projectsRouter.patch("/:id", (req: Request, res: Response) => {
  res.json({ msg: "✨ UPDATE a project" });
});

export default projectsRouter;
