import { Router } from "express";

import {
  getModuleProg,
  updateModuelProg,
  getAllModule,
  createModule,
  getModuleByID,
  updateModuleByID,
  deleteModuleByID,
} from "../controllers/module.controller.mjs";

const router = Router();

router.route("/").get(getAllModule).post(createModule);
router.route("/progress/:cid/:username").get(getModuleProg);

router
  .route("/:id")
  .get(getModuleByID)
  .put(updateModuleByID)
  .delete(deleteModuleByID);

router.route("/:id/progress").put(updateModuelProg);

export default router;
