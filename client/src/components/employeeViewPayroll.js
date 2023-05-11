import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { getPayRolls, reset, deletePayRoll } from "../features/payroll/payrollSlice"
import Spinner from './Spinner'
import useAuth from "../hooks/useAuth"
import useTitle from "../hooks/useTitle"

function EmpViewPayroll() {
  useTitle("View Employee Payroll")

  const { payrolls, isLoading, isError, message } = useSelector(state => state.payrolls)
  const { username } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getPayRolls())

    return () => {
      console.log('unloading allpayroll')
      dispatch(reset())
    }

  }, [isError, dispatch, message,])

  const filteredPayrolls = payrolls.filter((payroll) => {
    const uname = payroll.username

    return uname.includes(username)

  })
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>

      <div>
        <div class="leave-list">
          <div class="row justify-content-center">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Position</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>{
                filteredPayrolls.map((payroll) => {
                  return (
                    <tr key={payroll._id}>

                      <th scope="row">{payroll.eid}</th>
                      <td>{payroll.Name}</td>
                      <td>{payroll.department}</td>
                      <td>{payroll.position}</td>
                      <td>
                        <button class="btn btn-success" onClick={() => navigate(`/dash/emp/EmpIndPayroll/${payroll._id}`)}>
                          View
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-success" onClick={() => navigate('/dash/emp/EmpIndPaySlip')}>
                          View PaySlip
                        </button>
                      </td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmpViewPayroll