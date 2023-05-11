import { Router } from "express"

import {
    getAllDept,
    createDept,
    getDeptByID,
    updateDeptByID,
    deleteDeptByID
} from "../controllers/department.controller.mjs"

const router = Router()

router.route('/')
    .get(getAllDept)
    .post(createDept)

router.route('/:id')
    .get(getDeptByID)
    .put(updateDeptByID)
    .delete(deleteDeptByID)

export default router