import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

const TransportPaymentCard = (props) => {

  const { _id, Company, Account_No, Date, Distance, Total } = props.transportpayments

  const id = _id.toString()

  const deleteTransportPayment = (_id) => {
    //const id = TransportPayment._id 
    axios.delete(`http://localhost:5000/api/TransportPayment/${id}`).then(() => {
      //alert("TransportPayment Deleted Successfully")
      window.location.replace('/dash/admin/TransportPaymentList')
    })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  return (
    <>
      <tr>
        <td>{Company}</td>
        <td>{Account_No}</td>
        <td>{Date}</td>
        <td>{Distance}</td>
        <td>{Total}</td>


        <td>
          <Link to={{ pathname: `/dash/admin/UpdateTransportPayment/${id}` }}>
            <button class="btn btn-success">Update</button>
          </Link>
        </td>
        <td>
          <button type="button" class="btn btn-danger" onClick={deleteTransportPayment}>Delete</button>
        </td>
      </tr>
    </>
  )
}

export default TransportPaymentCard