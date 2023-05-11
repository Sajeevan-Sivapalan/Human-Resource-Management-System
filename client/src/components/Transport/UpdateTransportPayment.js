import React, { useState, useEffect } from 'react'
import { Link, useParams, withRouter } from 'react-router-dom';
import axios from "axios"

import 'bootstrap/dist/css/bootstrap.min.css';
import useTitle from '../../hooks/useTitle';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateTransportPayment = (props) => {
    useTitle("Update Transport Payment")

    //To get the id from URL
    const { id } = useParams()

    const [Company, setCompany] = useState("");
    const [Account_No, setAccount_No] = useState();
    const [Date, setDate] = useState("");
    const [Distance, setDistance] = useState();
    const Total = Distance * 100 + 40000

    useEffect(() => {
        axios.get(`http://localhost:5000/api/TransportPayment/${id}`).then((res) => {
            console.log(res.data)
            setCompany(res.data.Company)
            setAccount_No(res.data.Account_No)
            setDate(res.data.Date)
            setDistance(res.data.Distance)


        })
            .catch((error) => {
                console.log(error.response.data)
            })
    }, [])

    const update = (e) => {
        e.preventDefault() //Like preventing page to refresh

        const TransportPayments = {
            Company,
            Account_No,
            Date,
            Distance,
            Total
        }

        if (Company === "" || Account_No === "" || Date === "" || Distance === "" || Total === "") {
            //So if either any of this is empty the function will alert and return back
            alert("All the fields are mandatory")
            return
        }


        axios.put(`http://localhost:5000/api/TransportPayment/${id}`, TransportPayments).then(() => {
            console.log("TransportPayment updated successfully");
            //alert("TransportPayment Updated Successfully")
            window.location.replace('/dash/admin/TransportPaymentList')
        })
            .catch((error) => {
                console.log(error.response.data)
            })



    }

    return (
        <>
            <div style={{ marginTop: '90px' }} class="leave-list">
                <div class="row justify-content-center">
                    <form onSubmit={update}>
                        <div class="form-group">
                            <div class="row justify-content-center">
                                <div class="col-4">
                                    <label class="form-label"for="Company">Company</label>
                                    <input type="text" class="form-control" id="Company" placeholder="Enter Company" value={Company}
                                        onChange={(e) => {
                                            setCompany(e.target.value);
                                        }} required />
                                </div>


                                <div class="col-4">
                                    <label class="form-label"for="Account_No">Account_No</label>
                                    <input type="number" class="form-control" id="Account_No" placeholder="Enter Account_No" value={Account_No}
                                        onChange={(e) => {
                                            setAccount_No(e.target.value);
                                        }} required />
                                </div>

                                <div class="col-4">
                                    <label class="form-label"for="Date">Date</label>
                                    <input type="date" class="form-control" id="Date" placeholder="Enter Date" value={Date}
                                        onChange={(e) => {
                                            setDate(e.target.value);
                                        }} required />
                                </div>

                                <div class="col-4">
                                    <label class="form-label"for="Distance">Distance</label>
                                    <input type="number" class="form-control" id="Distance" placeholder="Enter Distance" value={Distance}
                                        onChange={(e) => {
                                            setDistance(e.target.value);
                                        }} required />
                                </div>

                                <div class="col-4">
                                    <label class="form-label"for="Total">Total</label>
                                    <input type="number" class="form-control" id="Total" placeholder="Enter Total" value={Total} disabled />
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <button style={{ marginTop: '10px' }} type="submit" class="btn btn-primary col-3">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UpdateTransportPayment