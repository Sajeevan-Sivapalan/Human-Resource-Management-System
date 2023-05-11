import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Plot from 'react-plotly.js'

const VehicleReport = () => {

    const [Vehicles, setVehicles] = useState([])

    //Retrieve all the resources
    const retrieveVehicles = () => {
        axios.get("http://localhost:5000/api/Vehicle").then((res) => {
            setVehicles(res.data)
        })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    useEffect(() => {
        retrieveVehicles()
    }, [])

    const bus = Vehicles.filter((vehicle) => {
        return vehicle.Vehicle_Type === "Bus"
    })

    const van = Vehicles.filter((vehicle) => {
        return vehicle.Vehicle_Type === "Van"
    })

    const vehicleName = [
        {
            x: ["Bus"],
            y: [bus.length],
            type: 'bar',
            marker: { color: 'green' },
        },
        {
            x: ["Van"],
            y: [van.length],
            type: 'bar',
            marker: { color: 'blue' },
        }
    ]

    const seatsLayout = {
        title: 'No of Vehicles in the Transport',
        xaxis: {
            title: 'VehicleType',
        },
        yaxis: {
            title: 'No of Vehicles',
        },
        height: 400

    }

    const vehicleNo = []
    const noSeats = []


    Vehicles.map((vehicle) => {
        vehicleNo.push(vehicle.Vehicle_No)
        noSeats.push(vehicle.No_Of_Seats)

    })

    const vehicles = [
        {
            labels: vehicleNo,
            values: noSeats,
            hole: .4,
            type: "pie"
        }
    ]


    return (
        <>
            <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#payrollstats">
                Vehicle Report
            </button>
            <div class="modal fade" id="payrollstats" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Vehicle Report</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">

                            <Plot data={vehicleName} layout={seatsLayout} />
                            <Plot data={vehicles} layout={{ title: 'Available Seats', height: 400}} />

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VehicleReport
