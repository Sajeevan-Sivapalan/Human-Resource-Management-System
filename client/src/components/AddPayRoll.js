import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPayRoll, reset } from '../features/payroll/payrollSlice'

function AddPayRoll() {
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        empId: '',
        position: '',
        otHours:''

    })
    const { name, empId,department,position,otHours } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isError, message, isSuccess } = useSelector
        (
            (state) => state.payrolls
        )
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate('/dash/admin/AllPayrolls')
        }
        return () => {
            console.log('Unloading addpayroll')
            dispatch(reset())
        }

    }, [isError, message, navigate, dispatch, isSuccess])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const payRollData = {
            name,
            empId,
            department,
            position,
            otHours
        }
        console.log(payRollData)
        dispatch(createPayRoll(payRollData))
    }

    return (
        <>
            <h1>AddPayRoll</h1>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Enter employee name'
                            onChange={onChange}
                        />

                        <input type='text'
                            className='form-control'
                            id='empId'
                            name='empId'
                            value={empId}
                            placeholder='Enter employee ID'
                            onChange={onChange}
                        />

                        {/* <input type='text'
                            className='form-control'
                            id='department'
                            name='department'
                            value={department}
                            placeholder='Enter employee department'
                            onChange={onChange}
                        /> */}
                        <select
                            className="form-control"
                            id="department"
                            name="department"
                            value={department}
                            onChange={onChange}
                        >
                            <option value="">Select department</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="IT">IT</option>
                        </select>

                        <select
                            className="form-control"
                            id="position"
                            name="position"
                            value={position}
                            onChange={onChange}
                        >
                            <option value="">Select position</option>
                            <option value="Executive">Executive/Senior</option>
                            <option value="Middle Management">Middle Management</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Entry level">Entry level</option>
                        </select>

                        <input type='text'
                            className='form-control'
                            id='otHours'
                            name='otHours'
                            value={otHours}
                            placeholder='Enter employee otHours'
                            onChange={onChange}
                        />

                        {/* <input type='number'
                            className='form-control'
                            id='hWorked'
                            name='hWorked'
                            value={hWorked}
                            placeholder='Enter hours worked'
                            onChange={onChange}
                        />
                        <input type='number'
                            className='form-control'
                            id='otHours'
                            name='otHours'
                            value={otHours}
                            placeholder='Enter overtime hours worked'
                            onChange={onChange}
                        />
                        <input type='number'
                            className='form-control'
                            id='salary'
                            name='salary'
                            value={salary}
                            placeholder='Enter Salary'
                            onChange={onChange}
                        /> */}
                    </div>
                    <div className="form-group">
                        <button type='submit' className="btn btn-block">
                            Add PayRoll
                        </button>
                    </div>

                </form>
            </section>
        </>
    )
}

export default AddPayRoll