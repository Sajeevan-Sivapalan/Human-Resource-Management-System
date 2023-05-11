import Employee from "../models/employee.model.mjs";
import Department from "../models/department.model.mjs";
import Course from "../models/course.model.mjs";

const getAllDept = async (req, res) => {
  try {
    res.status(200).json({ message: "Call To All Dept" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDept = async (req, res) => {
  try {
    const department = await Department.create(req.body);

    res
      .status(200)
      .json({
        message: `${department.dname}(${department.did}) Succcessfully Created`,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDeptByID = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findOne({ did: id });

    if (department) return res.status(200).json(department);
    else
      return res
        .status(404)
        .json({ message: `Departement(${id}) Does Not Exist` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDeptByID = async (req, res) => {
  try {
    const { id } = req.body;

    res.status(200).json({ message: "Call To Update Dept By ID" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteDeptByID = async (req, res) => {
  try {
    const { id } = req.body;

    res.status(200).json({ message: "Call To Get Delete By ID" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getAllDept, createDept, getDeptByID, updateDeptByID, deleteDeptByID };
