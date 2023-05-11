import React, { useState, useEffect } from 'react';
import axois from "axios";
import { Link } from 'react-router-dom';
import RouteCard from './RouteCard'
import AddRoute from './AddRoute';
import useTitle from '../../hooks/useTitle';

export default function RouteList() {
    useTitle("Route");

    const [Routes, setRoutes] = useState([]);
    const [Keyword, setKeyword] = useState('')

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
    const filteredRoutes = Routes.filter((route) => {
        const routeName = route.Route_Name.toLowerCase()

        const vehicleNo = route.Vehicle_No.toLowerCase()
        const keyword = Keyword.toLowerCase()

        return routeName.includes(keyword) || vehicleNo.includes(keyword)
    })

    const renderRoutesList = filteredRoutes.map((routes) => {
        return (
            <RouteCard routes={routes} />
        )
    })

    return (
        <>
            <div class="request">
                <div class="row justify-content-end">
                    <AddRoute></AddRoute>
                </div>
            </div>
            <div class="search">
                <div class="row justify-content-center">
                    <input type="text" class="form-control search-bar" id='searchRoute' placeholder='Enter Search Keyword' value={Keyword} onChange={(e) => setKeyword(e.target.value)} />
                </div>
            </div>
            <div>
                <div class="leave-list">
                    <div class="row justify-content-center">
                        <table class="table table-striped table-hover">
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
                                {renderRoutesList}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )

}


