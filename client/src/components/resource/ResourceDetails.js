import React,{useState, useEffect} from 'react'
import { Link,useParams } from 'react-router-dom';
import axios from "axios"
import AssignEmployee from './AssignEmployee';
//const id="12345"
const ResourceDetails = (props) => {
  
  const [resource, setResource] = useState([])
  const [newQty,setNewQty] = useState("")

  //To get the id from URL
  const {id} = useParams()

  const retrieveResource = () => {
      axios.get(`http://localhost:5000/api/resources/getResource/${id}`).then((res) =>{
        setResource(res.data)
        setNewQty(res.data.quantity)
      })
     .catch((error) => {
        console.log(error.res.data)
      })
  }

  console.log(resource)
  
  
        

    useEffect(() => {
      retrieveResource()
    },[])


    const {name,type,quantity,invoiceNo,supplierName,orderedDate,imageURL,employeesAssigned}=resource

    //const [...employees] = employeesAssigned

    //employees.isArray()

    const renderAssignedEmployees = employeesAssigned ? employeesAssigned.map((employee) => {
      return (
        <tr>
          <td>{employee}</td> 
          <td>    <button type="button" class="btn btn-danger" onClick={() => revokeResource({employee})}>Revoke</button> </td>           
        </tr>
      )
    }) : <h4>No employees assigned</h4>;

    const revokeResource = (employee) =>{
      //const employee = {
        //employeeName
      //}
      var updatedQuantity = newQty + 1
      const newQuantity = {
        updatedQuantity
      }
      console.log(newQuantity)
      axios.put(`http://localhost:5000/api/resources/updateQuantity/${id}`,newQuantity).then(() =>{
      
      })
      .catch((error) => {
        console.log(error.response.data)
      })
      axios.put(`http://localhost:5000/api/resources/revokeEmployee/${id}`,employee).then(() =>{
       alert("Resource revoked from Employee")
       window.location.replace(`/dash/admin/resource/${id}`)
      })
      .catch((error) => {
        console.log(error.response.data)
    })
   
  }



  return (
    <>  
        <div class="leave-list">
          <div class="row justify-content-center">
          <table class="table table-primary table-borderless">        
        <tbody> 
        <tr>
          <th>Name</th>   
          <td>  {name}    </td>         
          <td rowSpan={7} style={{ textAlign: 'center',verticalAlign: 'middle' }}>
            <AssignEmployee/>
          </td>
        </tr>
        <tr>
          <th>  Resource Type</th>  
          <td>  {type}    </td>
        </tr>
        <tr>
          <th>Quantity</th> 
          <td>  {quantity}    </td>
        </tr>
        <tr>
          <th>Invoice No</th>   
          <td>  {invoiceNo}   </td>
        </tr>
        <tr>
          <th>Supplier Name</th>   
          <td>  {supplierName}    </td>
        </tr>
        <tr>
          <th>Order Date</th>  
          <td>  {orderedDate} </td>
        </tr>
        <tr>
          <th>Image</th>
          <td>  <div><img src={imageURL} height={200} alt="resource image"/> </div> </td>
        </tr>
     
        </tbody>      
    </table>
    <table class="table">
      <thead>
        <tr>
        <th><h3>Assigned Employees</h3></th>
        <th></th>
        </tr>
      </thead>
      <tbody>
      {renderAssignedEmployees}
      </tbody>
    </table>
          </div>
        </div>
    </> 
  )
}

export default ResourceDetails