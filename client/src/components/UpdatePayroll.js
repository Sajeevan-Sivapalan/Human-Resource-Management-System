import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { updatePayRoll, reset } from "../features/payroll/payrollSlice"
import useTitle from "../hooks/useTitle"

function UpdatePayroll() {
    useTitle("Edit Payrolls")
    const [formData, setFormData] = useState({
        // Name: "",
        // eid: "",
        // department: "",
        // position: "",
        // otPaid:"",
        // otHours:""
    });
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError, message } = useSelector((state) => state.payrolls);

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        return () => {
            console.log("Unloading UpdatePayRoll")
            dispatch(reset());
        };
    }, [isError, message, navigate, dispatch]);

    const { payrolls } = useSelector((state) => state.payrolls);
    const payrollToUpdate = payrolls.find((p) => p._id === id)

    useEffect(() => {
        if (payrollToUpdate) {
            setFormData(payrollToUpdate)
        }
    }, [payrollToUpdate])

    const handleInputChange = (e) => {
        console.log('handleInputChange running');
        // console.log('formData before input change:', formData);


        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));

        console.log('formData after input change:', formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedPayRollData = {
            // Name: formData.Name,
            // eid:formData.eid,
            ...formData,
        };
        console.log(updatedPayRollData)
        dispatch(updatePayRoll({ id, updatedPayRollData })).then((result) => {
            if (updatePayRoll.fulfilled.match(result)) {
                navigate("/dash/admin/AllPayRolls")
            } else {
                toast.error(result.payload)
            }
        })
    };

    return (
        <>
            <div style={{ marginTop: '90px' }} class="leave-list">
                <div class="row justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <div class="form-group">
                            <div class="row justify-content-center">
                                <div class="col-4">
                                    <label class="form-label">Employee Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="Name"
                                        name="Name"
                                        value={formData.Name}
                                        disabled
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Employee ID</label>
                                    <input type='text'
                                        class='form-control'
                                        id='eid'
                                        name='eid'
                                        value={formData.eid}
                                        disabled
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div class="col-4">
                                    <label class="form-label">Department</label>
                                    <select
                                        class="form-control"
                                        id='department'
                                        name='department'
                                        disabled
                                        value={formData.department}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select department</option>
                                        <option value="HR">HR</option>
                                        <option value="Finance">Finance</option>
                                        <option value="IT">IT</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Position</label>
                                    <select
                                        class="form-control"
                                        id='position'
                                        name='position'
                                        disabled
                                        value={formData.position}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select position</option>
                                        <option value="Executive">Executive/Senior</option>
                                        <option value="Middle Management">Middle Management</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Entry level">Entry level</option>
                                    </select>
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Overtime Hours</label>
                                    <input type='text'
                                        class='form-control'
                                        id='otHours'
                                        name='otHours'
                                        value={formData.otHours}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Overtime Payment</label>
                                    <input type='text' disabled
                                        class='form-control'
                                        id='otPaid'
                                        name='otPaid'
                                        value={formData.otPaid}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Travel Allowance</label>
                                    <input type='text' disabled
                                        class='form-control'
                                        id='travelAllowance'
                                        name='travelAllowance'
                                        value={formData.travelAllowance}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Bonus</label>
                                    <input type='text'
                                        class='form-control'
                                        id='bonus'
                                        name='bonus'
                                        value={formData.bonus}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Meal Allowance</label>
                                    <input type='text' disabled
                                        class='form-control'
                                        id='mealAllowance'
                                        name='mealAllowance'
                                        value={formData.mealAllowance}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Base Salary</label>
                                    <input type='text' disabled
                                        class='form-control'
                                        id='BaseSalary'
                                        name='BaseSalary'
                                        value={formData.BaseSalary}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Taxations</label>
                                    <input type='text' disabled
                                        class='form-control'
                                        id='taxes'
                                        name='taxes'
                                        value={formData.taxes}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label">EPF</label>
                                    <input type='text' disabled
                                        class='form-control'
                                        id='epf'
                                        name='epf'
                                        value={formData.epf}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Deductions</label>
                                    <input type='text' disabled
                                        class='form-control'
                                        id='deductions'
                                        name='deductions'
                                        value={formData.deductions}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="col-4">
                                    <label class="form-label">Salary</label>
                                    <input type='text' disabled
                                        class='form-control'
                                        id='Salary'
                                        name='Salary'
                                        value={formData.Salary}
                                        placeholder='Enter employee Salary'
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div class="row justify-content-center">
                                    <button style={{ marginTop: '10px' }} type="submit" class="btn btn-primary col-2">
                                        Revise PayRoll
                                    </button>
                                    <button style={{ marginTop: '10px' }} class="btn btn-danger col-2" onClick={() => navigate('/dash/admin/AllPayRolls')}>
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdatePayroll
