import express from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controllers";
import { requireAuth } from "../middleware/requireAuth";

const projectsRouter = express.Router();

// Require auth for all routes
projectsRouter.use(requireAuth);

// GET all projects
projectsRouter.get("/", getProjects);

// GET a single project
projectsRouter.get("/:id", getProject);

// POST a new project
projectsRouter.post("/", createProject);

// DELETE a project
projectsRouter.delete("/:id", deleteProject);

// UPDATE a project
projectsRouter.patch("/:id", updateProject);

export default projectsRouter;
