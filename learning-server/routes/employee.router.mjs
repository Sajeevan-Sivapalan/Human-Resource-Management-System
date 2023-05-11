import { Router } from "express";

import {
  getAllEmployee,
  signInEmployee,
  signUpEmployee,
  createEmployee,
  getEmployeeByID,
  updateEmployeeByID,
  deleteEmployeeByID,
  getEmployeeInside,
} from "../controllers/employee.controller.mjs";

const router = Router();

router.route("/").get(getAllEmployee).post(createEmployee);
router.route("/signin").post(signInEmployee);
router.route("/signup").post(signUpEmployee);

router
  .route("/:id")
  .get(getEmployeeByID)
  .put(updateEmployeeByID)
  .delete(deleteEmployeeByID);

export default router;
