import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomerByCategory,
  getCustomers,
  searchCustomer,
  updateCustomer,
} from "../controllers/customer.controller";

const customersRouter = express.Router();

// GET all customers
customersRouter.get("/", getCustomers);

// GET all customers by category
customersRouter.get("/category/:category", getCustomerByCategory);

// GET a single customer
customersRouter.get("/:id", getCustomer);

// POST a new customer
customersRouter.post("/", createCustomer);

// DELETE a customer
customersRouter.delete("/:id", deleteCustomer);

// UPDATE a customer
customersRouter.patch("/:id", updateCustomer);

// SEARCH a customer
customersRouter.get("/search/:searchValue", searchCustomer);

export default customersRouter;
