import axios from "axios"
import { useEffect, useState } from "react"
import Spinner from "./Spinner"
import Plot from 'react-plotly.js'

function PayRollReport() {

  // const [HRsalary,setHRSalary] = useState(0)
  // const [HRAllow,setHRAllow] = useState(0)
  // const [Financesalary,setFinanceSalary] = useState(0)
  // const [FinanceAllow,setFinanceAllow] = useState(0)
  // const [ITsalary,setITSalary] = useState(0)
  // const [ITAllow,setITAllow] = useState(0)

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    HR: { salary: 0, allowance: 0, overtime: 0 },
    Finance: { salary: 0, allowance: 0, overtime: 0 },
    IT: { salary: 0, allowance: 0, overtime: 0 },
  });
  const [error, setError] = useState(null);
  const API_URL = 'http://localhost:5000/api/payrolls/'

  const getStats = async () => {
    setIsLoading(true)
    try {
      const [HR, Finance, IT] = await Promise.all([
        axios.get(API_URL + "search?query=HR"),
        axios.get(API_URL + "search?query=Finance"),
        axios.get(API_URL + "search?query=IT"),
      ]);

      const dataCopy = { ...data };
      dataCopy.HR.salary = HR.data.reduce(
        (acc, curr) => acc + curr.Salary,
        0
      );
      dataCopy.HR.allowance = HR.data.reduce(
        (acc, curr) => acc + curr.travelAllowance + curr.mealAllowance,
        0
      );
      dataCopy.HR.overtime = HR.data.reduce(
        (acc, curr) => acc + curr.otPaid,
        0
      );
      dataCopy.Finance.salary = Finance.data.reduce(
        (acc, curr) => acc + curr.Salary,
        0
      );
      dataCopy.Finance.allowance = Finance.data.reduce(
        (acc, curr) => acc + curr.travelAllowance + curr.mealAllowance,
        0
      );
      dataCopy.Finance.overtime = Finance.data.reduce(
        (acc, curr) => acc + curr.otPaid,
        0
      );
      dataCopy.IT.salary = IT.data.reduce(
        (acc, curr) => acc + curr.Salary,
        0
      );
      dataCopy.IT.allowance = IT.data.reduce(
        (acc, curr) => acc + curr.travelAllowance + curr.mealAllowance,
        0
      );
      dataCopy.IT.overtime = IT.data.reduce(
        (acc, curr) => acc + curr.otPaid,
        0
      );
      setData(dataCopy);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError("Something went wrong with data fetching");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getStats();
  }, [])


  var salaryFields = [
    {
      values: [data.HR.salary, data.IT.salary, data.Finance.salary],
      labels: ["HR Salary ", "IT Salary", "Finance Salary"],
      type: "pie",
      textinfo: "label+percent",
      // textposition:"outside",
      // automargin:true
    },
  ];
  var otFields = [
    {
      values: [data.HR.overtime, data.IT.overtime, data.Finance.overtime],
      labels: ["HR overtime ", "IT overtime", "Finance overtime"],
      type: "pie",
      textinfo: "label+percent",
      // textposition:"outside",
      // automargin:true
    },
  ];
  var allowFields = [
    {
      values: [data.HR.allowance, data.IT.allowance, data.Finance.allowance],
      labels: ["HR allowance ", "IT allowance", "Finance allowance"],
      type: "pie",
      textinfo: "label+percent",
      // textposition:"outside",
      // automargin:true
    },
  ];


  const lay1 = {
    height:450,
    width: '100%'};

  if (isLoading) {
    return <Spinner />
  }
  if (error) {
    return <div>{error}</div>
  }
  return (
    <>
      <div class="request">
        <div class="row justify-content-end">
          <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#payrollstats">
            PayRoll Statistics
          </button>
        </div>
      </div>
      <div class="modal fade" id="payrollstats" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">PayRoll Statistics</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <h3>Salaries Paid</h3>
              <Plot
                data={salaryFields}
                layout={lay1}

              />
              <table style={{ margin: "auto", width: "100%" }}>
                <thead>
                  <th>Departments</th>
                  <th>Salaries Paid</th>
                </thead>
                <tbody>
                  <tr>
                    <th>HR department</th>
                    <td>{data.HR.salary}</td>
                  </tr>
                  <tr>
                    <th>Finance department</th>
                    <td>{data.Finance.salary}</td>
                  </tr>
                  <tr style={{ 'border-bottom': "1px solid white" }}>
                    <th>IT department</th>
                    <td>{data.IT.salary}</td>
                  </tr>
                  <tr style={{ 'border-bottom': "5px double white" }}>
                    <th>Total Salaries Paid to all departments</th>
                    <td>{data.Finance.salary + data.HR.salary + data.IT.salary}</td>
                  </tr>

                </tbody>

              </table>

              <h3>Overtime Paid</h3>
              <Plot
                data={otFields}
                layout={lay1}
                onAutoSize={true}

              />

              <table style={{ margin: "auto", width: "100%" }}>
                <thead>
                  <th>Departments</th>
                  <th>Overtime Paid</th>
                </thead>
                <tbody>
                  <tr>
                    <th>HR department</th>
                    <td>{data.HR.overtime}</td>
                  </tr>
                  <tr>
                    <th>Finance department</th>
                    <td>{data.Finance.overtime}</td>
                  </tr>
                  <tr style={{ 'border-bottom': "1px solid white" }}>
                    <th>IT department</th>
                    <td>{data.IT.overtime}</td>
                  </tr>
                  <tr style={{ 'border-bottom': "5px double white" }}>
                    <th>Total Overtime Paid to all departments</th>
                    <td>{data.Finance.overtime + data.HR.overtime + data.IT.overtime}</td>
                  </tr>

                </tbody>

              </table>

              <h3>Allowances</h3>

              <Plot
                data={allowFields}
                layout={lay1}

              />

              <table style={{ margin: "auto", width: "100%" }}>
                <thead>
                  <th>Departments</th>
                  <th>Allowances</th>
                </thead>
                <tbody>
                  <tr>
                    <th>HR department</th>
                    <td>{data.HR.allowance}</td>
                  </tr>
                  <tr>
                    <th>Finance department</th>
                    <td>{data.Finance.allowance}</td>
                  </tr>
                  <tr style={{ 'border-bottom': "1px solid white" }}>
                    <th>IT department</th>
                    <td>{data.IT.allowance}</td>
                  </tr>
                  <tr style={{ 'border-bottom': "5px double white" }}>
                    <th>Total Allowances Paid to all departments</th>
                    <td>{data.Finance.allowance + data.HR.allowance + data.IT.allowance}</td>
                  </tr>

                </tbody>

              </table>

              {/* <p>HR Salary total = {HRsalary}</p>
    <p>Finance Salary Total = {Financesalary}</p>
    <p>IT salary total = {ITsalary}</p>
    <p>Total Salary Paid to all departments = {ITsalary+HRsalary+Financesalary}</p> */}
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PayRollReport