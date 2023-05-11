import { Router } from "express";

import {
  enrolledToCourse,
  getAllCourse,
  createCourse,
  getCourseByID,
  updateCourseByID,
  deleteCourseByID,
} from "../controllers/course.controller.mjs";

const router = Router();

router.route("/").get(getAllCourse).post(createCourse);
router.route("/enroll").post(enrolledToCourse);
router.route("/:id/:type").get(getCourseByID);

router.route("/:id").put(updateCourseByID).delete(deleteCourseByID);

export default router;
