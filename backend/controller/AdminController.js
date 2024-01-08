import config from "../config.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    if (email !== config.ADMIN_USERNAME || password !== config.ADMIN_PASSWORD) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({ email, type: "admin" }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
    return res.status(200).json({ token, type: "admin" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    if (oldPassword !== config.ADMIN_PASSWORD) {
      return res.status(400).json({ msg: "Invalid Old Password" });
    }
    config.ADMIN_PASSWORD = newPassword;
    return res.status(200).json({ msg: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
