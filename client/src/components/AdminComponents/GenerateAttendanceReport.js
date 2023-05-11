import React, { Component } from "react";
import axios from "axios";
import EmployeeAttendanceList from "./EmployeeAttendanceList";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

class GenerateAttendanceReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attendanceData: []
        }
    }
    
    componentDidMount() {
        //get all attendance record
        axios.get('http://localhost:5000/Attendance').then(res => {
            this.setState({
                empID: '',
                attendanceData: res.data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // search using employee id
    searchEmployeeAttendanceData = (event) => {
        event.preventDefault();
        this.setState({empID:event.currentTarget.value});
        const searchEmp = event.currentTarget.value;

        // get all attendance record
        axios.get(`http://localhost:5000/Attendance`).then(res => {
                this.filterContent(res.data, searchEmp);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // filter data for employee id
    filterContent(attendanceData, searchEmp) {
        const result = attendanceData.filter((attendanceData) => attendanceData.empID.includes(searchEmp));
        this.setState({attendanceData:result});
    }

     // mapping to EmployeeAttendanceList the record
    getAttendanceData = () => {
        return this.state.attendanceData.map((res, index) => {
            return <EmployeeAttendanceList obj={res} key={index} />
        }
    )}

    render() {
        return(
            <>
            <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#AttendanceReport">
                Generate Report For Employee
            </button>
            <div class="modal fade" id="AttendanceReport" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Generate Report For Employee</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row justify-content-center">
                                    <div class="col-6">
                                        <input type="text" class="form-control" placeholder="Search By Employee ID" onChange={this.searchEmployeeAttendanceData} />
                                    </div>
                                    <div class="row justify-content-center">
                                        <table class="table table-striped table-hover" id="employeeAttendance">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Employee ID</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Entry Time</th>
                                                    <th scope="col">Exit Time</th>
                                                    <th scope="col">Duration</th>
                                                </tr>
                                            </thead>
                                            <tbody>{this.getAttendanceData()}</tbody>
                                        </table>
                                    </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <ReactHTMLTableToExcel table="employeeAttendance" class="export-btn" filename={this.state.empID} sheet="tablexls" buttonText="Download Employee Record" />
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
    }
}

export default GenerateAttendanceReport;