import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { reset } from "../features/payroll/payrollSlice"
import useTitle from "../hooks/useTitle"
function IndividualPayroll() {
    useTitle("Employee Payroll")
    const [payroll, setpayroll] = useState({})
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isError, message } = useSelector((state) => state.payrolls);

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        return () => {
            console.log("Unloading IndividualPayRoll")
            dispatch(reset());
        };
    }, [isError, message, navigate, dispatch]);

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
                    <table class='table table-striped table-hover' style={{ margin: "auto", width: "75%" }}>
                        <tbody>
                            <tr>
                                <th>Employee Name   :</th>
                                <td align="right">{payroll.Name}</td>
                            </tr>
                            <tr>
                                <th>Employee ID   :</th>
                                <td align="right">{payroll.eid}</td>
                            </tr>
                            <tr>
                                <th>Department   :</th>
                                <td align="right">{payroll.department}</td>
                            </tr>
                            <tr>
                                <th>Position:</th>
                                <td align="right">{payroll.position}</td>
                            </tr>
                            <tr>
                                <th>Overtime worked   :</th>
                                <td align="right">{payroll.otHours}</td>
                            </tr>
                            <tr>
                                <th>Overtime Paid   :</th>
                                <td align="right">{payroll.otPaid}</td>
                            </tr>
                            <tr>
                                <th>Base Salary   :</th>
                                <td align="right">{payroll.BaseSalary}</td>
                            </tr>
                            <tr>
                                <th>Bonus   :</th>
                                <td align="right">{payroll.bonus}</td>
                            </tr>
                            <tr>
                                <th>Meal Allowance   :</th>
                                <td align="right">{payroll.mealAllowance}</td>
                            </tr>
                            <tr>
                                <th>Travel Allowance   :</th>
                                <td align="right">{payroll.travelAllowance}</td>
                            </tr>
                            <tr>
                                <th>Gross Salary   :</th>
                                <td align="right">{payroll.travelAllowance + payroll.BaseSalary + payroll.mealAllowance + payroll.otPaid}</td>
                            </tr>
                            <tr>
                                <th>Taxations  :</th>
                                <td align="right">{payroll.taxes}</td>
                            </tr>
                            <tr>
                                <th>EPF calculated   :</th>
                                <td align="right">{payroll.epf}</td>
                            </tr>
                            <tr>
                                <th>Deductions(taxes+epf)   :</th>
                                <td align="right">{payroll.deductions}</td>
                            </tr>
                            <tr>
                                <th>Salary   :</th>
                                <td align="right">{payroll.Salary}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button style={{marginTop:'10px'}} class="btn btn-primary col-3" onClick={() => navigate('/dash/admin/AllPayRolls')}>Back</button>
                </div>
            </div>
        </>
    )
}

export default IndividualPayroll