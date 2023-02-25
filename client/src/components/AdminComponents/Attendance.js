import React, { Component, useState } from "react";
import QRCode from "react-qr-code";
import CreateEmpQR from "./CreateEmpQR";
import axios from "axios";
import AttendanceList from "./AttendanceList";
import GenerateAttendanceReport from "./GenerateAttendanceReport";


class Attendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendanceData: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/Attendance').then(res => {
            this.setState({
                attendanceData: res.data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    searchEmployeeAttendanceData = (event) => {
        const searchEmp = event.currentTarget.value;
        axios.get(`http://localhost:5000/Attendance`).then(res => {
                this.filterContent(res.data, searchEmp);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    filterContent(attendanceData, searchEmp) {
        const result = attendanceData.filter((attendanceData) => attendanceData.empID.includes(searchEmp));
        this.setState({attendanceData:result});
    }

    getAttendanceData = () => {
        return this.state.attendanceData.map((res, index) => {
            return <AttendanceList obj={res} key={index} />
        }
    )}

    render() {
        return(
            <>
                <div class="request">
                    <div class="row justify-content-end">
                        <GenerateAttendanceReport></GenerateAttendanceReport>
                        <CreateEmpQR></CreateEmpQR>
                    </div>
                </div>
                <div class="search">
                    <div class="row justify-content-center">
                        <input type="text" class="form-control search-bar" placeholder="Search By Employee ID" onChange={this.searchEmployeeAttendanceData} />
                    </div>
                </div>
                <div>
                    <div class="attendance-list">
                        <div class="row justify-content-center">
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Employee ID</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Entry Time</th>
                                        <th scope="col">Exit Time</th>
                                    </tr>
                                </thead>
                                <tbody>{this.getAttendanceData()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Attendance;