import React, { useState, useEffect } from 'react';
import axois from "axios";
import { Link } from 'react-router-dom';
import RouteCard from './RouteCard'

export default function ViewRouteDetails() {

    const [Routes, setRoutes] = useState([]);

    useEffect(() => {
        function getRoutes() {
            axois.get("http://localhost:5000/api/Route/").then((res) => {
                console.log(res.data);
                setRoutes(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getRoutes();
    }, [])



    return (
        <div class="leave-list">
            <div class="row justify-content-center">
                <table className="table table-striped table-hover">
                    <tr>
                        <th>Route_Name</th>
                        <th>Vehicle_Type</th>
                        <th>Vehicle_No</th>
                        <th>Arrival_Time</th>
                        <th>Starting_Point</th>
                        <th>Ending_Point</th>
                        <th></th>
                    </tr>
                    <tbody>
                        {
                            Routes.map((Route) => (
                                <tr>
                                    <td>{Route.Route_Name}</td>
                                    <td>{Route.Vehicle_Type}</td>
                                    <td>{Route.Vehicle_No}</td>
                                    <td>{Route.Arrival_Time}</td>
                                    <td>{Route.Starting_Point}</td>
                                    <td>{Route.Ending_Point}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )

}


