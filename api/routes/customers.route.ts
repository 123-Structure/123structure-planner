import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customer.controller";

const customersRouter = express.Router();

// GET all customers
customersRouter.get("/", getCustomers);

// GET a single customer
customersRouter.get("/:id", getCustomer);

// POST a new customer
customersRouter.post("/", createCustomer);

// DELETE a customer
customersRouter.delete("/:id", deleteCustomer);

// UPDATE a customer
customersRouter.patch("/:id", updateCustomer);

export default customersRouter;
