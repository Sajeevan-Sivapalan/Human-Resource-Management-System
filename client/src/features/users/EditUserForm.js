import React from 'react'
import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import { useDispatch } from 'react-redux'
import { updatePayrollfromUser } from '../payroll/payrollSlice'
import useTitle from '../../hooks/useTitle'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/
const NIC_REGEX = /^(?:\d{12}|\d{9}[a-zA-Z])$/
const NUMBER_REGEX = /^\d{10}$/



const EditUserForm = ({ user }) => {
    useTitle("Edit Employee")

    const handleCancel = () => navigate(`/dash/admin/users`)


    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)
    const [firstname, setFirstname] = useState(user.firstname)
    const [lastname, setLastname] = useState(user.lastname)
    const [fullname, setFullname] = useState(user.fullname)
    const [gender, setGender] = useState(user.gender)
    const [NIC, setNic] = useState(user.NIC)
    const [validNIC, setValidNIC] = useState(false)
    const [date_of_birth, setDob] = useState(user.date_of_birth)
    const [place_of_birth, setPob] = useState(user.place_of_birth)
    const [age, setAge] = useState(user.age)
    const [nationality, setNationality] = useState(user.address)
    const [religion, setReligion] = useState(user.religion)
    const [department, setDepartment] = useState(user.department)
    const [date_joined, setDatejoin] = useState(user.date_joined)
    const [employee_type, setEmptype] = useState(user.employee_type)
    const [empID, setEmpid] = useState(user.empID)
    const [contact, setContact] = useState(user.contact)
    const [validContact, setValidContact] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [address, setAddress] = useState(user.address)
    const [position, setPosition] = useState(user.position)


    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setValidNIC(NIC_REGEX.test(NIC))
    }, [NIC])

    useEffect(() => {
        setValidContact(NUMBER_REGEX.test(contact))
    }, [contact])


    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])

            setFirstname('')
            setLastname('')
            setFullname('')
            setGender('')
            setNic('')
            setDob('')
            setPob('')
            setAge('')
            setNationality('')
            setReligion('')
            setDepartment('')
            setDatejoin('')
            setEmptype('')
            setEmpid('')
            setContact('')
            setEmail('')
            setAddress('')
            setPosition('')

            window.location.replace('http://localhost:3000/dash/admin/users')
        }

    }, [isSuccess, isDelSuccess, navigate])


    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onFirstnameChanged = e => setFirstname(e.target.value)
    const onLasttnameChanged = e => setLastname(e.target.value)
    const onFullnameChanged = e => setFullname(e.target.value)
    const onGenderChanged = e => setGender(e.target.value)
    const onNicChanged = e => setNic(e.target.value)
    const onDobChanged = e => setDob(e.target.value)
    const onPobChanged = e => setPob(e.target.value)
    const onAgeChanged = e => setAge(e.target.value)
    const onNationalityChanged = e => setNationality(e.target.value)
    const onReligionChanged = e => setReligion(e.target.value)
    const onDepartmentChanged = e => setDepartment(e.target.value)
    const onDatejoinChanged = e => setDatejoin(e.target.value)
    const onEmptypeChanged = e => setEmptype(e.target.value)
    const onEmpidChanged = e => setEmpid(e.target.value)
    const onContactChanged = e => setContact(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onAddressChanged = e => setAddress(e.target.value)
    const onPositionChanged = e => setPosition(e.target.value)



    const onSaveUserClicked = async (e) => {
        if (password) {
            try {

                const updatedPayRollData = {
                    fullname,
                    department,
                    position,
                    username,
                };

                await updateUser({
                    id: user.id, username, password, active, roles, firstname,
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
                })

                console.log(updatedPayRollData)
                dispatch(updatePayrollfromUser({ empID, updatedPayRollData }))

            } catch (error) {
                console.log(error)
            }


        }
        else {
            try {

                const updatedPayRollData = {
                    username,
                    fullname,
                    department,
                    position,
                };
                await updateUser({
                    id: user.id, username, roles, active, firstname,
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
                })
                console.log(updatedPayRollData)
                dispatch(updatePayrollfromUser({ empID, updatedPayRollData }))
            } catch (error) {
                console.log(error)
            }
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    let canSave
    if (password) {
        canSave = [roles.length, validUsername, validPassword, validContact, validNIC].every(Boolean) && !isLoading
    } else {
        canSave = [roles.length, validUsername, validContact, validNIC].every(Boolean) && !isLoading
    }

    // const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validNICClass = !validNIC ? 'form__input--incomplete' : ''
    const validContactClass = !validContact ? 'form__input--incomplete' : ''
    // const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <div style={{ marginTop: '40px' }} class="leave-list">
                <div class="row justify-content-center">
                    <form onSubmit={e => e.preventDefault()}>
                        <div>
                            <h2>View and Edit Employee Details</h2>
                            <br />
                        </div>
                        <div class="form-group">
                            <div class="row">

                                <div>
                                    <h5><u>Employee Personal Information</u></h5>

                                </div>

                                <div class="col-4">


                                    <label class="form-label" htmlFor="firstname">
                                        First Name: </label>
                                    <input
                                        class="form-control"
                                        id="firstname"
                                        name="firstname"
                                        type="text"
                                        autoComplete="off"
                                        value={firstname}
                                        onChange={onFirstnameChanged}
                                    /> </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="lastname">
                                        Last Name: </label>
                                    <input
                                        class="form-control"
                                        id="lastname"
                                        name="lastname"
                                        type="text"
                                        autoComplete="off"
                                        value={lastname}
                                        onChange={onLasttnameChanged}
                                    /> </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="fullname">
                                        Full Name: </label>
                                    <input
                                        class="form-control"
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        autoComplete="off"
                                        value={fullname}
                                        onChange={onFullnameChanged}
                                    /> </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="gender">
                                        Gender: </label>
                                    <select
                                        class="form-control"
                                        name="gender"
                                        id="gender"
                                        value={gender}
                                        required
                                        onChange={onGenderChanged}

                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                        <option value="Personal">Personal</option>


                                    </select>
                                </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="NIC">
                                        NIC: </label>
                                    <input
                                        class={`form-control ${validNICClass}`}
                                        id="NIC"
                                        name="NIC"
                                        type="text"
                                        autoComplete="off"
                                        value={NIC}
                                        onChange={onNicChanged}
                                    /> </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="date_of_birth">
                                        Date of birth: </label>
                                    <input
                                        class="form-control"
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        type="text"
                                        autoComplete="off"
                                        value={date_of_birth}
                                        onChange={onDobChanged}
                                    /> </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="place_of_birth">
                                        Place of birth: </label>
                                    <input
                                        class="form-control"
                                        id="place_of_birth"
                                        name="place_of_birth"
                                        type="text"
                                        autoComplete="off"
                                        value={place_of_birth}
                                        onChange={onPobChanged}
                                    /> </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="age">
                                        Age: </label>
                                    <input
                                        class="form-control"
                                        id="age"
                                        name="age"
                                        type="text"
                                        autoComplete="off"
                                        value={age}
                                        onChange={onAgeChanged}
                                    /> </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="nationality">
                                        Nationality: </label>
                                    <input
                                        class="form-control"
                                        id="nationality"
                                        name="nationality"
                                        type="text"
                                        autoComplete="off"
                                        value={nationality}
                                        onChange={onNationalityChanged}
                                    /> </div>


                                <div class="col-4">

                                    <label class="form-label" htmlFor="religion">
                                        Religion: </label>
                                    <input
                                        class="form-control"
                                        id="religion"
                                        name="religion"
                                        type="text"
                                        autoComplete="off"
                                        value={religion}
                                        onChange={onReligionChanged}
                                    /> </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="contact">
                                        Contact: </label>
                                    <input
                                        class={`form-control ${validContactClass}`}

                                        id="contact"
                                        name="contact"
                                        type="text"
                                        autoComplete="off"
                                        value={contact}
                                        onChange={onContactChanged}
                                    /> </div>

                                <div class="col-4">


                                    <label class="form-label" htmlFor="email">
                                        Email: </label>
                                    <input
                                        class="form-control"
                                        id="email"
                                        name="email"
                                        type="text"
                                        autoComplete="off"
                                        value={email}
                                        onChange={onEmailChanged}
                                    />

                                </div>

                                <div class="col-4">
                                    <label class="form-label" htmlFor="address">
                                        Address: </label>
                                    <input
                                        class="form-control"
                                        id="address"
                                        name="address"
                                        type="text"
                                        autoComplete="off"
                                        value={address}
                                        onChange={onAddressChanged}
                                    />
                                </div>

                                <div>

                                    <div>
                                        <br />

                                    </div>

                                    <h5><u>Employment Details</u></h5>

                                </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="empID">
                                        Employee ID: </label>
                                    <input
                                        class="form-control" disabled
                                        id="empID"
                                        name="empID"
                                        type="text"
                                        autoComplete="off"
                                        value={empID}
                                        onChange={onEmpidChanged}
                                    /> </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="department">
                                        Department: </label>

                                    <select
                                        class="form-control"
                                        id="department"
                                        name="department"
                                        value={department}
                                        onChange={onDepartmentChanged}
                                        required
                                    >
                                        <option value="">Select department</option>
                                        <option value="HR Department">HR Department</option>
                                        <option value="IT Department">IT Department</option>
                                        <option value="Finance Department">Finance Department</option>

                                    </select>


                                </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="position">
                                        Position: </label>

                                    <select
                                        className="form-control"
                                        id="position"
                                        name="position"
                                        value={position}
                                        onChange={onPositionChanged}
                                    >
                                        <option value="">Select position</option>
                                        <option value="Executive">Executive/Senior</option>
                                        <option value="Middle Management">Middle Management</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Entry level">Entry level</option>
                                    </select>
                                </div>



                                <div class="col-4">

                                    <label class="form-label" htmlFor="date_joined">
                                        Date Joined: </label>
                                    <input
                                        class="form-control"
                                        id="date_joined"
                                        name="date_joined"
                                        type="text"
                                        autoComplete="off"
                                        value={date_joined}
                                        onChange={onDatejoinChanged}
                                    /> </div>


                                <div class="col-4">

                                    <label class="form-label" htmlFor="employee_type">
                                        Employee type: </label>
                                    <select
                                        class="form-control"
                                        name="employee_type"
                                        id="employee_type"
                                        value={employee_type}
                                        onChange={onEmptypeChanged}
                                        required
                                    >
                                        <option value="">Select an employee type</option>
                                        <option value="Full-time Employee">Full-time Employee</option>
                                        <option value="Part-time Employee">Part-time Employee</option>
                                        <option value="Temporary Employee">Temporary Employee</option>
                                        <option value="Intern">Intern</option>

                                    </select> </div>

                                <div>
                                    <br />

                                </div>
                                <div>
                                    <h5><u>Employee Login Credentials</u></h5>

                                </div>



                                <div class="col-4">

                                    <label class="form-label" htmlFor="username">
                                        Username: [3-20 letters]</label>
                                    <input
                                        class={`form-control ${validUserClass}`}

                                        id="username" disabled
                                        name="username"
                                        type="text"
                                        autoComplete="off"
                                        value={username}
                                        onChange={onUsernameChanged}
                                    />
                                </div>

                                <div class="col-4">


                                    <label class="form-label" htmlFor="password">
                                        Password: </label>
                                    <input
                                        class={`form-control ${validPwdClass}`}

                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={onPasswordChanged}
                                    />
                                </div>

                                <div class="col-4">

                                    <label class="form-label" htmlFor="roles">
                                        Employee Role:</label><br />
                                    <select
                                        id="roles"
                                        name="roles"
                                        class={`form__select `}
                                        // multiple={true}
                                        size="3"
                                        value={roles}
                                        onChange={onRolesChanged}
                                    >
                                        {options}
                                    </select> </div>

                                <div>
                                    <h4>Do you need to revoke employee access to system? </h4>

                                    <label class="form-label" htmlFor="user-active">
                                        Employee Active:
                                        <input
                                            class="form-checkbox"
                                            id="user-active"
                                            name="user-active"
                                            type="checkbox"
                                            checked={active}
                                            onChange={onActiveChanged}
                                        />
                                    </label>

                                </div>




                                <div class="row justify-content-center">
                                    <button style={{ marginTop: '10px' }}
                                        class="btn btn-primary col-3"
                                        title="Save"
                                        onClick={onSaveUserClicked}
                                        disabled={!canSave}
                                    >
                                        Update Employee
                                    </button>
                                    <button style={{ marginTop: '10px' }}
                                        class="btn btn-danger col-3"
                                        title="Cancel"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

    return content

}

export default EditUserForm

















