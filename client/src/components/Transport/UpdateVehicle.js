import React, { useState, useEffect } from 'react'
import { Link, useParams, withRouter } from 'react-router-dom';
import axios from "axios"

import 'bootstrap/dist/css/bootstrap.min.css';
import useTitle from '../../hooks/useTitle';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UpdateVehicle = (props) => {
    useTitle("Update Vehicle");
    //To get the id from URL
    const { id } = useParams()

    const [Vehicle_No, setVehicle_No] = useState("");
    const [Vehicle_Type, setVehicle_Type] = useState("");
    const [Driver_Name, setDriver_Name] = useState("");
    const [Driver_Contact_No, setDriver_Contact_No] = useState();
    const [Driver_Nic, setDriver_Nic] = useState("");
    const [Company, setCompany] = useState("");
    const [No_Of_Seats, setNo_Of_Seats] = useState();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/Vehicle/${id}`).then((res) => {
            console.log(res.data)
            setVehicle_No(res.data.Vehicle_No)
            setVehicle_Type(res.data.Vehicle_Type)
            setDriver_Name(res.data.Driver_Name)
            setDriver_Contact_No(res.data.Driver_Contact_No)
            setDriver_Nic(res.data.Driver_Nic)
            setCompany(res.data.Company)
            setNo_Of_Seats(res.data.No_Of_Seats)
        })
            .catch((error) => {
                console.log(error.response.data)
            })
    }, [])

    const update = (e) => {
        e.preventDefault() //Like preventing page to refresh

        const Vehicles = {
            Vehicle_No,
            Vehicle_Type,
            Driver_Name,
            Driver_Contact_No,
            Driver_Nic,
            Company,
            No_Of_Seats
        }

        if (Vehicle_No === "" || Vehicle_Type === "" || Driver_Name === "" || Driver_Contact_No === "" || Driver_Nic === "" || Company === "" || No_Of_Seats === "") {
            //So if either any of this is empty the function will alert and return back
            alert("All the fields are mandatory")
            return
        }


        axios.put(`http://localhost:5000/api/Vehicle/${id}`, Vehicles).then(() => {
            console.log("Vehicle updated successfully");
            //alert("Vehicles Updated Successfully")
            window.location.replace('/dash/admin/VehicleList')
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
                                    <label class="form-label" for="Vehicle_No">Vehicle_No</label>
                                    <input type="text" class="form-control" id="Vehicle_No" placeholder="Enter Vehicle_No" value={Vehicle_No}
                                        onChange={(e) => {
                                            setVehicle_No(e.target.value);
                                        }} required />
                                </div>

                                <div class="col-4">
                                    <label class="form-label" for="Vehicle_Type">Vehicle_Type</label>
                                    <select class="form-select" id="Vehicle_Type" name="Vehicle_Type" onChange={(e) => setVehicle_Type(e.target.value)}>
                                        <option selected>Select Vehicle Type</option>
                                        <option value="Bus">Bus</option>
                                        <option value="Van">Van</option>
                                    </select>
                                </div>



                                <div class="col-4">
                                    <label class="form-label" for="Driver_Name">Driver_Name</label>
                                    <input type="text" class="form-control" id="Driver_Name" placeholder="Enter Driver_Name" value={Driver_Name}
                                        onChange={(e) => {
                                            setDriver_Name(e.target.value);
                                        }} required />
                                </div>

                                <div class="col-4">
                                    <label class="form-label" for="Driver_Contact_No">Driver_Contact_No</label>
                                    <input type="number" class="form-control" id="Driver_Contact_No" placeholder="Enter Driver_Contact_No" value={Driver_Contact_No} onChange={(e) => {
                                        setDriver_Contact_No(e.target.value);
                                    }} required />
                                </div>

                                <div class="col-4">
                                    <label class="form-label" for="Driver_Nic">Driver_Nic</label>
                                    <input type="text" class="form-control" id="Driver_Nic" placeholder="Enter Driver_Nic" value={Driver_Nic}
                                        onChange={(e) => {
                                            setDriver_Nic(e.target.value);
                                        }} required />
                                </div>

                                <div class="col-4">
                                    <label class="form-label" for="Company">Company</label>
                                    <input type="text" class="form-control" id="Company" placeholder="Enter Company" value={Company}
                                        onChange={(e) => {
                                            setCompany(e.target.value);
                                        }} required />
                                </div>

                                <div class="col-4">
                                    <label class="form-label" for="No_Of_Seats">No_Of_Seats</label>
                                    <input type="number" class="form-control" id="No_Of_Seats" placeholder="Enter No_Of_Seats" value={No_Of_Seats}
                                        onChange={(e) => {
                                            setNo_Of_Seats(e.target.value);
                                        }} required />
                                </div>
                                <div  style={{marginTop:'10px'}} class="row justify-content-center">
                                    <button type="submit" class="btn btn-primary col-3">Update</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
export default UpdateVehicle