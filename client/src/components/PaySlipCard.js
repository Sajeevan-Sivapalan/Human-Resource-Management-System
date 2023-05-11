function PaySlipCard({ payroll }) {
    return (
        <>
            <div class="col-3">
                <div class="card">
                    <h5 class="card-header">{payroll.Name}</h5>
                    <div class="card-body">
                        <table>
                            <tr >
                                <th>
                                    Payments
                                </th>
                                <th>
                                    Amount (Rs.)
                                </th>
                            </tr>
                            <tr >
                                <th>
                                    Basic Salary
                                </th>
                                <td align="right">
                                    {payroll.BaseSalary}
                                </td>
                            </tr >
                            <tr>
                                <th>
                                    Overtime
                                </th>
                                <td align="right">
                                    {payroll.otPaid}
                                </td>
                            </tr >
                            <tr>
                                <th>
                                    Bonus   :
                                </th>
                                <td align="right">
                                    {payroll.bonus}
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    Meal Allowance
                                </th>
                                <td align="right">
                                    {payroll.mealAllowance}
                                </td>
                            </tr >
                            <tr>
                                <th>
                                    Tarvel Allowance
                                </th>
                                <td align="right" >
                                    {payroll.travelAllowance}
                                </td>
                            </tr >
                            <tr>
                                <th>
                                    Gross Salary
                                </th>
                                <td align="right">
                                    {payroll.travelAllowance + payroll.BaseSalary + payroll.mealAllowance + payroll.otPaid+payroll.bonus}
                                </td>
                            </tr >
                            <tr>
                                <th>
                                    Taxations
                                </th>
                                <td align="right">
                                    {payroll.taxes}
                                </td>
                            </tr >
                            <tr>
                                <th>
                                    EPF
                                </th>
                                <td align="right">
                                    {payroll.epf}
                                </td>
                            </tr >
                            <tr >
                                <th colspan="1b ">
                                    Salary
                                </th>
                                <td align="right">
                                    {payroll.Salary}
                                </td>
                            </tr >
                        </table >
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaySlipCard