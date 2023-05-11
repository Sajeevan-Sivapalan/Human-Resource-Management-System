import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import VehicleCard from './VehicleCard'
import AddVehicle from './AddVehicle';
import VehicleReport from './VehicleReport';
import useTitle from '../../hooks/useTitle';

export default function VehicleList() {
    useTitle("Vehicle");

    const [Vehicles, setVehicles] = useState([]);
    const [Keyword, setKeyword] = useState('')

    useEffect(() => {
        function getVehicles() {
            axios.get("http://localhost:5000/api/Vehicle/").then((res) => {
                console.log(res.data);
                setVehicles(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getVehicles();
    }, [])
    //Search functions 
    const filteredVehicles = Vehicles.filter((vehicle) => {
        const vehicleNo = vehicle.Vehicle_No.toLowerCase()
        const vehicleType = vehicle.Vehicle_Type.toLowerCase()
        const driverName = vehicle.Driver_Name.toLowerCase()
        const company = vehicle.Company.toLowerCase()
        const keyword = Keyword.toLowerCase()

        return vehicleNo.includes(keyword) || vehicleType.includes(keyword) || driverName.includes(keyword) || company.includes(keyword)
    })

    const renderVehiclesList = filteredVehicles.map((vehicles) => {
        return (
            <VehicleCard vehicles={vehicles} />
        )
    })

    return (
        <>
            <div class="request">
                <div class="row justify-content-end">
                    <AddVehicle></AddVehicle>
                    <VehicleReport></VehicleReport>
                </div>
            </div>
            <div class="search">
                <div class="row justify-content-center">
                <input type="text" class="form-control search-bar" id='searchVehicle' placeholder='Enter Search Keyword' value={Keyword} onChange={(e) => setKeyword(e.target.value)} />
                </div>
            </div>
            <div>
                <div class="leave-list">
                    <div class="row justify-content-center">
                        <table class="table table-striped table-hover">
                            <tr>
                                <th>Vehicle No</th>
                                <th>Vehicle Type</th>
                                <th>Driver Name</th>
                                <th>Driver Contact No</th>
                                <th>Driver NIC</th>
                                <th>Company</th>
                                <th>No Of Seats</th>
                                <th></th>
                            </tr>

                            <tbody>
                                {renderVehiclesList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}


