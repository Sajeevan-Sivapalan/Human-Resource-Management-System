const express = require('express')
const router = express.Router()
const vacancyController = require('../controllers/vacancyController.js')

router.route('/')
    .get(vacancyController.getAllVacancys)
    .post(vacancyController.createNewVacancy)
    .patch(vacancyController.updateVacancy)
    .delete(vacancyController.deleteVacancy)

module.exports = router
