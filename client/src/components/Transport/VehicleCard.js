import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

const VehicleCard = (props) => {

  const { _id, Vehicle_No, Vehicle_Type, Driver_Name, Driver_Contact_No, Driver_Nic, Company, No_Of_Seats } = props.vehicles

  const id = _id.toString()

  const deleteVehicle = (_id) => {
    //const id = Vehicle._id 
    axios.delete(`http://localhost:5000/api/Vehicle/${id}`).then(() => {
      //alert("Vehicle Deleted Successfully")
      window.location.replace('/dash/admin/VehicleList')
    })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  return (
    <>
      <tr>
        <td>{Vehicle_No}</td>
        <td>{Vehicle_Type}</td>
        <td>{Driver_Name}</td>
        <td>{Driver_Contact_No}</td>
        <td>{Driver_Nic}</td>
        <td>{Company}</td>
        <td>{No_Of_Seats}</td>

        <td>
          <Link to={{ pathname: `/dash/admin/UpdateVehicle/${id}` }}>
            <button class="btn btn-success">Update</button>
          </Link>
        </td>
        <td>
          <button type="button" class="btn btn-danger" onClick={deleteVehicle}>Delete</button>
        </td>
      </tr>
    </>
  )
}

export default VehicleCard