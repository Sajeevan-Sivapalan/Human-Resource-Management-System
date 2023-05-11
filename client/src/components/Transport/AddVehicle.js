import React, { useState } from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddVehicle() {

  const [Vehicle_No, setVehicle_No] = useState("");
  const [Vehicle_Type, setVehicle_Type] = useState("");
  const [Driver_Name, setDriver_Name] = useState("");
  const [Driver_Contact_No, setDriver_Contact_No] = useState();
  const [Driver_Nic, setDriver_Nic] = useState("");
  const [Company, setCompany] = useState("");
  const [No_Of_Seats, setNo_Of_Seats] = useState();

  const demo = (e) => {
    e.preventDefault()
    setVehicle_No("WP-KF-15543")
    setVehicle_Type("Van")
    setDriver_Name("Maran Kumar")
    setDriver_Contact_No("0723533871")
    setDriver_Nic("200202105412")
    setCompany("Maran Tours and Travels")
    setNo_Of_Seats("10")
  }

  function sendData(e) {
    e.preventDefault();

    const newVehicle = {
      Vehicle_No,
      Vehicle_Type,
      Driver_Name,
      Driver_Contact_No,
      Driver_Nic,
      Company,
      No_Of_Seats
    }

    axios.post("http://localhost:5000/api/Vehicle/", newVehicle).then(() => {
      //alert("Vehicle Added")
      window.location.replace('/dash/admin/VehicleList')

    }).catch((err) => {
      console.log(err.response.data)
    })

  }


  return (

    <>
      <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#addvechile">
        Add Vehicle
      </button>
      <div class="modal fade" id="addvechile" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Add Vehicle</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form onSubmit={sendData}>
                <div class="row">
                  <div class="col-6">
                    <label class="form-label" for="Vehicle_No">Vehicle No</label>
                    <input type="text" class="form-control" id="Vehicle_No" value = {Vehicle_No} placeholder="Enter Vehicle_No"  pattern="[A-Z]{2}-[A-Z]{2}-\d{4}"
                      onChange={(e) => {
                        setVehicle_No(e.target.value);
                      }} />
                  </div>


                  <div class="col-6">
                    <label class="form-label" for="Vehicle_Type">Vehicle Type</label>
                    <select class="form-select" id="Vehicle_Type" name="Vehicle_Type" value={Vehicle_Type} onChange={(e) => setVehicle_Type(e.target.value)}>
                      <option selected>Select Vehicle Type</option>
                      <option value="Bus">Bus</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>

                  <div class="col-6">
                    <label class="form-label" for="Driver_Name">Driver Name</label>
                    <input type="text" class="form-control" id="Driver_Name" value={Driver_Name} placeholder="Enter Driver_Name"
                      onChange={(e) => {
                        setDriver_Name(e.target.value);
                      }} required />
                  </div>

                  <div class="col-6">
                    <label class="form-label" for="Driver_Contact_No">Driver Contact No</label>
                    <input type="number" class="form-control" id="Driver_Contact_No" value={Driver_Contact_No} placeholder="Enter Driver_Contact_No"
                      onChange={(e) => {
                        setDriver_Contact_No(e.target.value);
                      }} required />
                  </div>

                  <div class="col-6">
                    <label class="form-label" for="Driver_Nic">Driver Nic</label>
                    <input type="text" class="form-control" id="Driver_Nic" value={Driver_Nic} placeholder="Enter Driver_Nic"
                      onChange={(e) => {
                        setDriver_Nic(e.target.value);
                      }} required />
                  </div>

                  <div class="col-6">
                    <label class="form-label" for="Company">Company</label>
                    <input type="text" class="form-control" id="Company" value={Company} placeholder="Enter Company"
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }} required />
                  </div>

                  <div class="col-6">
                    <label class="form-label" for="No_Of_Seats">No Of Seats</label>
                    <input type="number" class="form-control" id="No_Of_Seats" value={No_Of_Seats} placeholder="Enter No_Of_Seats"
                      onChange={(e) => {
                        setNo_Of_Seats(e.target.value);
                      }} required />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                     <button style={{ margin: "25px" }} className="btn btn-primary" onClick={(e) => {
                                        demo(e);
                                    }}>Demo</button>
                    <Button type="submit" class="btn btn-primary">Submit</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );

}

