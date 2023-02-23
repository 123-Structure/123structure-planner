import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  searchCustomer,
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

// SEARCH a customer
customersRouter.get("/search/:id", searchCustomer);

export default customersRouter;
