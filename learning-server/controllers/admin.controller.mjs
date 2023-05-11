import Admin from "../models/admin.model.mjs";
import { comparePasswords, hashPassword, createJWT } from "../config/auth.mjs";

const getAllAdmin = async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.create({
      email,
      password: await hashPassword(password),
      firstName,
      lastName,
    });
    const token = createJWT(admin);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const signInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Entered Email Not Exist" });
    }
    const isvalid = await comparePasswords(password, admin.password);

    if (!isvalid) {
      return res.status(404).json({ message: "Entered Password Incorrect" });
    }

    const token = createJWT(admin);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAdminByID = async (req, res) => {
  try {
    const { id } = req.body;

    res.status(200).json({ message: "Call To Get Admin By ID" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAdminByID = async (req, res) => {
  try {
    const { id } = req.body;

    res.status(200).json({ message: "Call To Update Admin By ID" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAdminByID = async (req, res) => {
  try {
    const { id } = req.body;

    res.status(200).json({ message: "Call To Delete Admin By ID" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getAllAdmin,
  createAdmin,
  getAdminByID,
  signInAdmin,
  updateAdminByID,
  deleteAdminByID,
};
