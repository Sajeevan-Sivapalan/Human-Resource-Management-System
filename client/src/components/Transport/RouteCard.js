import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

const RouteCard = (props) => {

  const { _id, Route_Name, Vehicle_Type, Vehicle_No, Arrival_Time, Starting_Point, Ending_Point } = props.routes

  const id = _id.toString()

  const deleteRoute = (_id) => {
    //const id = Vehicle._id 
    axios.delete(`http://localhost:5000/api/Route/${id}`).then(() => {
      //alert("Route Deleted Successfully")
      window.location.replace('/dash/admin/RouteList')
    })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  return (
    <>
      <tr>
        <td>{Route_Name}</td>
        <td>{Vehicle_Type}</td>
        <td>{Vehicle_No}</td>
        <td>{Arrival_Time}</td>
        <td>{Starting_Point}</td>
        <td>{Ending_Point}</td>



        <td>
          <Link to={{ pathname: `/dash/admin/UpdateRoute/${id}` }}>
            <button className="btn btn-success">Update</button>
          </Link>
        </td>
        <td>
          <button type="button" className="btn btn-danger" onClick={deleteRoute}>Delete</button>
        </td>
      </tr>
    </>
  )
}

export default RouteCard