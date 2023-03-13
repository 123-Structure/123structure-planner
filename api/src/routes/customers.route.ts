import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomerByCategory,
  getCustomerByGroup,
  getCustomers,
  searchCustomer,
  updateCustomer,
} from "../controllers/customer.controller";

const customersRouter = express.Router();

// GET all customers
customersRouter.get("/", getCustomers);

// GET all customers by category
customersRouter.get("/category/:commercial/:category", getCustomerByCategory);

// GET all customers by category
customersRouter.get("/group/:category/:group", getCustomerByGroup);

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
