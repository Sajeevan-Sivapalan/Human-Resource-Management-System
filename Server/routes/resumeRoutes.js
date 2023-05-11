const express = require('express')
const router = express.Router()
const resumeController = require('../controllers/resumeController.js')

router.route('/')
    .get(resumeController.getAllResumes)
    .post(resumeController.createNewResume)
    .patch(resumeController.updateResume)
    .delete(resumeController.deleteResume)

module.exports = router
