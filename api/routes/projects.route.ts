import express, { Request, Response } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controller";

const projectsRouter = express.Router();

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
