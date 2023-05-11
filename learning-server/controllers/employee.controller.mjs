import Employee from "../models/employee.model.mjs";
import Department from "../models/department.model.mjs";
import Course from "../models/course.model.mjs";
import { comparePasswords, hashPassword, createJWT } from "../config/auth.mjs";

const signUpEmployee = async (req, res) => {
  console.log(req.body);
  const { username, password, department, role, firstName, lastName } =
    req.body;

  try {
    const employee = Employee.create({
      username,
      password: await hashPassword(password),
      department,
      role,
      firstName,
      lastName,
    });

    const token = createJWT(employee);
    res.status(200).json({ token, employee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const signInEmployee = async (req, res) => {
  const { username, password, type } = req.body;
  try {
    const employee = await Employee.findOne({ username: username });

    if (!employee) {
      return res
        .status(500)
        .json({ message: "user not available or password incorrect" });
    }

    console.log(employee);

    const isvalid = await comparePasswords(password, employee.password);

    if (!isvalid) {
      return res.status(404).json({ message: "Entered Password Incorrect" });
    }
    const token = createJWT(employee);
    res.status(200).json({ token, user: employee });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployeeInside = async (req, res) => {
  console.log(id);
};

const getAllEmployee = async (req, res) => {
  try {
    res.status(200).json({ message: "Call To All Employee" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    res.status(200).json({ message: "Call To Create Employee" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployeeByID = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findOne({ username: id })
      .populate("department")
      .populate("enrolled.courseId");

    if (!employee) {
      return res.status(404).json({ message: "Not Found" });
    }

    console.log(employee);

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEmployeeByID = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    res.status(200).json({ message: `Call To Update Employee By ID ${id}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployeeByID = async (req, res) => {
  try {
    const { id } = req.body;

    res.status(200).json({ message: "Call To Delete Employee By ID" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  signUpEmployee,
  signInEmployee,
  getAllEmployee,
  getEmployeeInside,
  createEmployee,
  getEmployeeByID,
  updateEmployeeByID,
  deleteEmployeeByID,
};
