import jwt from "jsonwebtoken";

import config from "../config.js";

import Customer from "../model/Customer.js";

import Vendor from "../model/Vendor.js";

const tokenCheck = async (req, res, next) => {
  try {
    if (req.headers.Authorization || req.headers.authorization) {
      let token = req.headers.Authorization || req.headers.authorization;
      token = token.substring(7, token.length);
      const isCorrect = jwt.verify(token, config.JWT_SECRET);
      if (isCorrect) {
        const decodedData = isCorrect;
        if (
          decodedData.type === "admin" &&
          decodedData.email === config.ADMIN_USERNAME
        ) {
          return next();
        }
        if (decodedData.type === "customer") {
          const isCustomer = await Customer.findById(decodedData.id);
          if (isCustomer) {
            req.user = isCustomer;
            return next();
          }
        }
        if (decodedData.type === "vendor") {
          const isVendor = await Vendor.findById(decodedData.id);
          if (isVendor) {
            req.user = isVendor;
            return next();
          }
        }
      }
      return res.status(401).json({ msg: "Unauthorized, Please login" });
    }
    return res.status(401).json({ msg: "Unauthorized , Please login" });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default {
  tokenCheck,
};
