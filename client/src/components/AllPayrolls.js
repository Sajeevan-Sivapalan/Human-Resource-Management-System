import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { getPayRolls, reset, deletePayRoll } from "../features/payroll/payrollSlice"
import Spinner from './Spinner'
import PayRollReport from "./PayRollReport"
import useTitle from "../hooks/useTitle"
//import PayrollSearchBar from "./PayrollSearchBar"
function AllPayrolls() {
  useTitle("Payrolls")

  const { payrolls, isLoading, isError, message } = useSelector(state => state.payrolls)
  //const [filteredPayrolls, setFilteredPayrolls] = useState(payrolls)
  const [Keyword, setKeyword] = useState('')

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

  }, [isError, dispatch, message])

  // const handleSearch = (searchValue) => {
  //   const newPayrolls = payrolls.filter(payroll => 
  //     payroll.Name.toLowerCase().includes(searchValue.toLowerCase()) || 
  //     payroll.department.toLowerCase().includes(searchValue.toLowerCase()) || 
  //     payroll.position.toLowerCase().includes(searchValue.toLowerCase())
  //   )
  //   setFilteredPayrolls(newPayrolls)
  // }

  const filteredPayrolls = payrolls.filter((payroll) => {
    const name = payroll.Name.toLowerCase()
    const department = payroll.department.toLowerCase()
    const position = payroll.position.toLowerCase()
    const keyword = Keyword.toLowerCase()

    return name.includes(keyword) || department.includes(keyword) || position.includes(keyword)

  })
  // const onUpdatePayroll = (payrollid) => {
  //   navigate(`/UpdatePayroll/${payrollid}`);
  // }
  // const onViewPayroll = (payrollid) => {
  //   navigate(`/IndividualPayroll/${payrollid}`);
  // }
  // const onAddPayroll = () => {
  //   dispatch(reset())
  //   navigate('/dash/admin/AddPayRoll')
  // }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div class="request">
        <div class="row justify-content-end">
          {/* <button class="btn btn-primary col-1" onClick={(onAddPayroll)}>
            Add Pay Roll
          </button> */}
          <PayRollReport></PayRollReport>

        </div>
      </div>
      <div class="search">
        {/* <PayrollSearchBar handleSearch={handleSearch} /> */}
        <div class="row justify-content-center">
          <input type="text" class="form-control search-bar" value={Keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search by employee name, department,position" />
        </div>
      </div>
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
                        <button
                          disabled={payroll.isLoading}
                          class="btn btn-danger"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this payroll?")) {
                              dispatch(deletePayRoll(payroll._id));
                            }
                          }}>
                          Delete
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-primary" onClick={() => navigate(`/dash/admin/UpdatePayroll/${payroll._id}`)}>
                          Revise
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-success" onClick={() => navigate(`/dash/admin/IndividualPayroll/${payroll._id}`)}>
                          View Payroll
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

export default AllPayrolls