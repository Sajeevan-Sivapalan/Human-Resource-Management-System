import express from "express";

import {
  getAllAdmin,
  createAdmin,
  getAdminByID,
  updateAdminByID,
  deleteAdminByID,
  signInAdmin,
} from "../controllers/admin.controller.mjs";

const router = express.Router();

router.route("/").get(getAllAdmin);

router.route("/signUp").post(createAdmin);

router.route("/signIn").post(signInAdmin);

router
  .route("/:id")
  .get(getAdminByID)
  .put(updateAdminByID)
  .delete(deleteAdminByID);

export default router;
