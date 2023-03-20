import { Request, Response } from "express";
import { Types } from "mongoose";
import Project from "../models/project.models";

// GET all projects
export const getProjects = async (req: Request, res: Response) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
  res.status(200).json(projects);
};

// GET a single project
export const getProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "⛔ No such project" });
  }

  const project = await Project.findById(id);

  if (!project) {
    return res.status(404).json({ error: "⛔ No such project" });
  }

  res.status(200).json(project);
};

// POST a new project
export const createProject = async (req: Request, res: Response) => {
  const { DOSSIER, AFFAIRE, CLIENT } = req.body;

  try {
    const newProject = await Project.create({
      DOSSIER,
      AFFAIRE,
      CLIENT,
    });
    res.status(200).json(newProject);
  } catch (error: any) {
    res.status(400).json({ error: "⛔ " + error.message });
  }
};

// DELETE a project
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "⛔ No such project" });
  }

  const project = await Project.findOneAndDelete({ _id: id });

  if (!project) {
    return res.status(400).json({ error: "⛔ No such project" });
  }

  res.status(200).json({ project });
};

// UPDATE a project
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "⛔ No such project" });
  }

  const project = await Project.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!project) {
    return res.status(400).json({ error: "⛔ No such project" });
  }

  res.status(200).json({ project });
};
