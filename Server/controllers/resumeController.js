const Resume = require('../models/Resume')

// @desc Get all Resumes
// @route GET /Resumes
// @access Private
const getAllResumes = async (req, res) => {
    // Get all Resumes from MongoDB
    const resumes = await Resume.find().lean()

    // If no Resumes 
    if (!resumes?.length) {
        return res.status(400).json({ message: 'No Resumes found' })
    }

    res.json(resumes)
}

// @desc Create new Resume
// @route POST /Resumes
// @access Private
const createNewResume = async (req, res) => {
    const fullname = req.body.fullname
    const forthepostof =req.body.forthepostof
    const resumess =req.body.resumess
    const match =req.body.match
    // Confirm data
    

    /* Check for duplicate Resumename
    const duplicate = await Resume.findOne({ Resumename }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Resumename' })
    }
    */
    const resumeObject = {fullname,forthepostof,resumess,match}

    // Create and store new Resume 
    const resume = await Resume.create(resumeObject)

    if (resume) { //created 
        res.status(201).json({ message: `New Resume ${fullname} created` })
    } else {
        res.status(400).json({ message: 'Invalid Resume data received' })
    }
}

// @desc Update a Resume
// @route PATCH /Resumes
// @access Private
const updateResume = async (req, res) => {
    const { id, fullname, forthepostof, resumess,match} = req.body
    // Confirm data 
    if (!fullname || !resumess || !forthepostof || !match) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Does the Resume exist to update?
    const resume = await Resume.findById(id).exec()

    if (!resume) {
        return res.status(400).json({ message: 'Resume not found' })
    }

    // Check for duplicate 
   const duplicate = await Resume.findOne({ fullname }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original Resume 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate Resumename' })
    }

    resume.fullname = fullname
    resume.forthepostof = forthepostof
    resume.resumess = resumess
    resume.match=match

    const updatedResume = await resume.save()

    res.json({ message: `${updatedResume.fullname} updated` })
}

// @desc Delete a Resume
// @route DELETE /Resumes
// @access Private
const deleteResume = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Resume ID Required' })
    }

    // Does the Resume exist to delete?
    const resume = await Resume.findById(id).exec()

    if (!Resume) {
        return res.status(400).json({ message: 'Resume not found' })
    }

    const result = await resume.deleteOne()

    const reply = `Resumename ${result.fullname} with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllResumes,
    createNewResume,
    updateResume,
    deleteResume
}