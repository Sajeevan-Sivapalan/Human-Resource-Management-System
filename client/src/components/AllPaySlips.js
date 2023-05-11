import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { getPayRolls, reset } from "../features/payroll/payrollSlice"
import Spinner from './Spinner'
import PaySlipCard from "./PaySlipCard"
import useTitle from "../hooks/useTitle"
// import PayrollSearchBar from "./PayrollSearchBar"

function AllPaySlips() {
  useTitle("Payslips")

  const { payrolls, isLoading, isError, message } = useSelector(state => state.payrolls)
  // const [filteredPayrolls, setFilteredPayrolls] = useState(payrolls)

  const [Keyword, setKeyword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    dispatch(getPayRolls())

    return () => {
      console.log('unloading payslips')
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
    // const department = payroll.department.toLowerCase()
    // const position = payroll.position.toLowerCase()
    const keyword = Keyword.toLowerCase()

    return name.includes(keyword)
    //  || department.includes(keyword) || position.includes(keyword)

  })
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      {/* <div>
        <PayrollSearchBar handleSearch={handleSearch} />
        
      </div> */}
      <div class="search">  
        <div class="row justify-content-center">
          {/* <PayrollSearchBar handleSearch={handleSearch} /> */}
          <input type="text" class="form-control search-bar" value={Keyword} onChange={e => setKeyword(e.target.value)} placeholder="Search by employee name" />
        </div>
      </div>
        {payrolls.length > 0 ? (
          <div class="leave-list">
            <div class="row justify-content-center">
              {filteredPayrolls.map((payroll) => (
                <PaySlipCard key={payroll._id} payroll={payroll} />
              ))}
            </div>
            <button style={{ marginTop: '10px' }} class="btn btn-primary col-1" onClick={() => navigate('/dash/admin/AllPayRolls')}>
                        Back
                    </button>
          </div>) : (<h3>No payslips</h3>)}
    </>
  )
}

export default AllPaySlips