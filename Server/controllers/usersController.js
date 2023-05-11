const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

//GET all users
//route GET /users
//Private

const getAllUsers = asyncHandler(async (req, res) => {

    const users = await User.find().select('-password').lean()

    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})




//Create new  users
//route POST /users
//Private

const createNewUser = asyncHandler(async (req, res) => {

    const { username,
        password,
        roles,
        firstname,
        lastname,
        fullname,
        gender,
        NIC,
        date_of_birth,
        place_of_birth,
        age,
        nationality,
        religion,
        department,
        date_joined,
        employee_type,
        empID,
        contact,
        email,
        address,
        position
    } = req.body

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Check for duplicate empID
    const duplicate_id = await User.findOne({ empID }).lean().exec()

    if (duplicate_id) {
        return res.status(409).json({ message: 'Duplicate Employee ID' })
    }


    //hash password received
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = {
        username, "password": hashedPwd, roles, firstname,
        lastname,
        fullname,
        gender,
        NIC,
        date_of_birth,
        place_of_birth,
        age,
        nationality,
        religion,
        department,
        date_joined,
        employee_type,
        empID,
        contact,
        email,
        address,
        position
    }

    //create and store new user
    const user = await User.create(userObject)


    if (user) {  //if user created
        res.status(201).json({ message: `New user ${username} created` })
    }
    else {
        res.status(400).json({ message: 'Invalid user data received' })
    }


})











//Update  user
//route PATCH/users
//Private

const updateUser = asyncHandler(async (req, res) => {

    const { id,
        username,
        password,
        roles,
        firstname,
        lastname,
        fullname,
        gender,
        NIC,
        date_of_birth,
        place_of_birth,
        age,
        nationality,
        religion,
        department,
        date_joined,
        employee_type,
        empID,
        contact,
        email,
        address,
        position,

        active
    } = req.body


    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.roles = roles
    user.firstname = firstname
    user.lastname = lastname
    user.fullname = fullname
    user.gender = gender
    user.NIC = NIC
    user.date_of_birth = date_of_birth
    user.place_of_birth = place_of_birth
    user.age = age
    user.nationality = nationality
    user.religion = religion
    user.department = department
    user.date_joined = date_joined
    user.employee_type = employee_type
    user.empID = empID
    user.contact = contact
    user.email = email
    user.address = address
    user.position = position
    user.active = active


    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })


})




//Delete user
//route DELETE/users
//Private

const deleteUser = asyncHandler(async (req, res) => {

    const { id } = req.body

    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)


})



module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}