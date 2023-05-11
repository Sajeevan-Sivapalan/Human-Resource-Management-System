import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { reset } from "../features/payroll/payrollSlice"
import useTitle from "../hooks/useTitle"

function EmpIndPayroll() {
    useTitle("Employee Payroll")

    const [payroll, setpayroll] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError, message } = useSelector((state) => state.payrolls);

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        return () => {
            console.log("Unloading IndividualPayRoll")
            dispatch(reset());
        };
    }, [isError, message, dispatch]);

    const { payrolls } = useSelector((state) => state.payrolls);
    const payrollToView = payrolls.find((p) => p._id === id)

    useEffect(() => {
        if (payrollToView)
            setpayroll(payrollToView)
    }, [payrollToView])

    return (
        <>

            <div class="leave-list">
                <div class="row justify-content-center">
                    <table class='table table-striped table-hover' style={{ margin: "auto", width: "100%" }}>
                        <tbody>
                            <tr>
                                <th>Employee Name   :</th>
                                <td>{payroll.Name}</td>
                            </tr>
                            <tr>
                                <th>Employee ID   :</th>
                                <td>{payroll.eid}</td>
                            </tr>
                            <tr>
                                <th>Department   :</th>
                                <td>{payroll.department}</td>
                            </tr>
                            <tr>
                                <th>Position:</th>
                                <td>{payroll.position}</td>
                            </tr>
                            <tr>
                                <th>Overtime worked   :</th>
                                <td>{payroll.otHours}</td>
                            </tr>
                            <tr>
                                <th>Overtime Paid   :</th>
                                <td>{payroll.otPaid}</td>
                            </tr>
                            <tr>
                                <th>Base Salary   :</th>
                                <td>{payroll.BaseSalary}</td>
                            </tr>
                            <tr>
                                <th>Bonus   :</th>
                                <td>{payroll.bonus}</td>
                            </tr>
                            <tr>
                                <th>Meal Allowance   :</th>
                                <td>{payroll.mealAllowance}</td>
                            </tr>
                            <tr>
                                <th>Travel Allowance   :</th>
                                <td>{payroll.travelAllowance}</td>
                            </tr>
                            <tr>
                                <th>Gross Salary   :</th>
                                <td>{payroll.travelAllowance + payroll.BaseSalary + payroll.mealAllowance + payroll.otPaid}</td>
                            </tr>
                            <tr>
                                <th>Taxations  :</th>
                                <td>{payroll.taxes}</td>
                            </tr>
                            <tr>
                                <th>EPF calculated   :</th>
                                <td>{payroll.epf}</td>
                            </tr>
                            <tr>
                                <th>Deductions(taxes+epf)   :</th>
                                <td>{payroll.deductions}</td>
                            </tr>
                            <tr>
                                <th>Salary   :</th>
                                <td>{payroll.Salary}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button style={{ marginTop: '10px' }} class="btn btn-primary col-3" onClick={() => navigate('/dash/emp/EmployeeViewPayroll')}>
                        Back
                    </button>
                </div>
            </div>

        </>
    )
}

export default EmpIndPayroll