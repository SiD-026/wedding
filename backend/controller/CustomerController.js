import Customer from "../model/Customer.js";
import bcrypt from "bcrypt";
import config from "../config.js";

import jwt from "jsonwebtoken";
import Order from "../model/Order.js";
import Service from "../model/Service.js";
import mongoose from "mongoose";

const create = async (req, res) => {
  try {
    //validate customer data
    const emailExist = await Customer.findOne({ email: req.body.email });
    if (emailExist)
      return res.status(400).send({ msg: "Email already exists" });

    const phoneExist = await Customer.findOne({ phone: req.body.phone });
    if (phoneExist)
      if (phoneExist)
        return res.status(400).send({ msg: "phone already exists" });

    req.body.password = await bcrypt.hash(
      req.body.password,
      Number(config.SALT_ROUNDS)
    );
    const customer = await Customer.create(req.body);
    return res.status(200).send(customer);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const get = async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await Customer.findById(id);
    if (!customer) {
      return res
        .status(404)
        .send({ msg: "Customer with requested id not found" });
    }
    return res.status(200).send(customer);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const list = async (req, res) => {
  try {
    const customers = await Customer.find();
    if (customers.length === 0) {
      return res.status(404).send({ msg: "There are no customers found" });
    }
    return res.status(200).send(customers);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await Customer.findById(req.user._id);
    if (!user) return res.status(404).send({ msg: "User not found" });
    const validPass = await bcrypt.compare(oldPassword, user.password);
    if (!validPass)
      return res.status(404).send({ msg: "Invalid Old password" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await Customer.findById(id);
    if (!customer) {
      return res
        .status(404)
        .send({ msg: "Customer with requested id not found" });
    }
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body);
    return res.status(200).send(updatedCustomer);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.aggregate([
      {
        $match: {
          customerId: new mongoose.Types.ObjectId(id),
        },
      },
    ]);

    const service = await Service.aggregate([
      {
        $match: {
          customerId: new mongoose.Types.ObjectId(id),
        },
      },
    ]);

    if (order.length > 0) {
      return res
        .status(404)
        .send({ msg: "Customers Are Avialble at Orders Table" });
    }

    if (service.length > 0) {
      return res
        .status(404)
        .send({ msg: "Customers Are Avialble at Service Table" });
    }

    const customer = await Customer.findById(id);
    if (!customer) {
      return res
        .status(404)
        .send({ msg: "Customer with requested id not found" });
    }
    const deletedCustomer = await Customer.findByIdAndRemove(id, req.body);
    return res.status(200).send(deletedCustomer);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const search = async (req, res) => {
  try {
    //adding regex to the query params
    for (const [k, v] of Object.entries(req.query)) {
      if (k === "phone" || k === "sort" || k === "by") {
        continue;
      }
      req.query[k] = {
        $regex: v,
      };
    }

    const customers = await Customer.find(req.query);
    if (req.query.sort && req.query.by) {
      const by = req.query.by;
      const sort = req.query.sort;
      //sorting
      switch (sort) {
        case "name":
          customers.sort((a, b) => {
            return by === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          });
          break;
        case "email":
          customers.sort((a, b) => {
            return by === "asc"
              ? a.email.localeCompare(b.email)
              : b.email.localeCompare(a.email);
          });
          break;
        case "phone":
          customers.sort((a, b) => {
            return by === "asc" ? a.phone - b.phone : b.phone - a.phone;
          });
          break;
        case "date":
          customers.sort((a, b) => {
            return by === "asc"
              ? new Date(a.joinedAt) - new Date(b.joinedAt)
              : new Date(b.joinedAt) - new Date(a.joinedAt);
          });
          break;

        default:
          break;
      }
    }
    res.status(200).send(customers);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const login = async (req, res) => {
  try {
    const customer = await Customer.findOne({ email: req.body.email });
    if (!customer) {
      return res
        .status(404)
        .send({ msg: "Customer Not Found , Please Register" });
    }
    const isCorrect = await bcrypt.compare(
      req.body.password,
      customer.password
    );
    if (!isCorrect) {
      return res.status(400).send({ msg: "Incorrect Password" });
    }

    const token = jwt.sign(
      { id: customer._id, email: customer.email, type: "customer" },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRES_IN,
      }
    );
    return res.status(200).send({ token, customerId: customer._id });
  } catch (err) {
    return res.status(500).send(err);
  }
};

export default {
  create,
  get,
  update,
  list,
  search,
  deleteById,
  login,
  changePassword,
};
