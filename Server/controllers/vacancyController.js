const Vacancy = require('../models/Vacancy')

// @desc Get all Vacancies
// @route GET /Vacancies
// @access Private
const getAllVacancys = async (req, res) => {
    // Get all Vacancies from MongoDB
    const vacancies = await Vacancy.find().lean()

    // If no Vacancies 
    if (!vacancies?.length) {
        return res.status(400).json({ message: 'No Vacancies found' })
    }

    res.json(vacancies)
}

// @desc Create new Vacancy
// @route POST /Vacancies
// @access Private
const createNewVacancy = async (req, res) => {
    const jobtitle = req.body.jobtitle
    const description =req.body.description
    const requirements =req.body.requirements
    // Confirm data
    

    /* Check for duplicate Vacancyname
    const duplicate = await Vacancy.findOne({ Vacancyname }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Vacancyname' })
    }
    */
    const resumeObject = {jobtitle,description,requirements}

    // Create and store new Vacancy 
    const resume = await Vacancy.create(resumeObject)

    if (resume) { //created 
        res.status(201).json({ message: `New Vacancy ${jobtitle} created` })
    } else {
        res.status(400).json({ message: 'Invalid Vacancy data received' })
    }
}

// @desc Update a Vacancy
// @route PATCH /Vacancies
// @access Private
const updateVacancy = async (req, res) => {
    const { id, jobtitle, description, requirements} = req.body
    // Confirm data 
    if (!jobtitle || !requirements || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the Vacancy exist to update?
    const resume = await Vacancy.findById(id).exec()

    if (!resume) {
        return res.status(400).json({ message: 'Vacancy not found' })
    }

    // Check for duplicate 
   const duplicate = await Vacancy.findOne({ jobtitle }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original Vacancy 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate Vacancy name' })
    }

    resume.jobtitle = jobtitle
    resume.description = description
    resume.requirements = requirements

    const updatedVacancy = await resume.save()

    res.json({ message: `${updatedVacancy.jobtitle} updated` })
}

// @desc Delete a Vacancy
// @route DELETE /Vacancies
// @access Private
const deleteVacancy = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Vacancy ID Required' })
    }

    // Does the Vacancy exist to delete?
    const resume = await Vacancy.findById(id).exec()

    if (!Vacancy) {
        return res.status(400).json({ message: 'Vacancy not found' })
    }

    const result = await resume.deleteOne()

    const reply = `Vacancyname ${result.jobtitle} with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllVacancys,
    createNewVacancy,
    updateVacancy,
    deleteVacancy
}