import { Request, Response } from "express";
import { Types } from "mongoose";
import Customer from "../models/customer.model";

// GET all customers
export const getCustomers = async (req: Request, res: Response) => {
  const customers = await Customer.find({}).sort({ createdAt: -1 });
  res.status(200).json(customers);
};

// GET a single customer
export const getCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "⛔ No such customer" });
  }

  const customer = await Customer.findById(id);

  if (!customer) {
    return res.status(404).json({ error: "⛔ No such customer" });
  }

  res.status(200).json(customer);
};

// POST a new customer
export const createCustomer = async (req: Request, res: Response) => {
  const {
    category,
    group,
    name,
    location,
    email,
    phone,
    contact,
    priceList,
    commercial,
    appointment,
    projectGoal,
    paymentDeadline,
    paymentType,
    paymentStatus,
  } = req.body;

  try {
    const newCustomer = await Customer.create({
      category,
      group,
      name,
      location,
      email,
      phone,
      contact,
      priceList,
      commercial,
      appointment,
      projectGoal,
      paymentDeadline,
      paymentType,
      paymentStatus,
    });

    res.status(200).json(newCustomer);
  } catch (error: any) {
    res.status(400).json({ error: "⛔ " + error.message });
  }
};

// DELETE a customer
export const deleteCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "⛔ No such customer" });
  }

  const customer = await Customer.findOneAndDelete({ _id: id });

  if (!customer) {
    return res.status(400).json({ error: "⛔ No such customer" });
  }

  res.status(200).json({ customer });
};

// UPDATE a customer
export const updateCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "⛔ No such customer" });
  }

  const customer = await Customer.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!customer) {
    return res.status(400).json({ error: "⛔ No such customer" });
  }

  res.status(200).json({ customer });
};

//SEARCH a customer
export const searchCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;

  const customers = await Customer.find(
    { $text: { $search: id } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } });

  if (!customers) {
    return res.status(400).json({ error: "⛔ No such customer" });
  }
  res.status(200).json(customers);
};
