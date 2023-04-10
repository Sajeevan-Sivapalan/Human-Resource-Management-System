import axios from "axios";
import React, { Component } from "react";
import EmployeeReqLeaveForm from "./EmployeeReqLeaveForm";
import EmployeeLeaveList from "./EmployeeLeaveList";

class EmployeeReqLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empID: "emp111",
            empLeaveData: []
        }
    }

    componentDidMount() {
        // get all Employee request leave record and sending to filterContent method
        axios.get(`http://localhost:5000/EmployeeReqLeave`).then(res => {
            this.setState({
                empLeaveData: res.data
            })
            this.filterContent(res.data, this.state.empID);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // filter data for employee id 
    filterContent(empLeaveData, searchEmp) {
        const result = empLeaveData.filter((empLeaveData) => empLeaveData.empID.includes(searchEmp));
        this.setState({empLeaveData:result});
    }

     // mapping to EmployeeLeaveList the record
    getReqLeaveData() {
        return this.state.empLeaveData.map((res, index) => {
            return <EmployeeLeaveList obj={res} key={index} />
        }
    )}

    render() {
        return(
            <>
                <EmployeeReqLeaveForm></EmployeeReqLeaveForm>
                <div class="leave-list">
                    <div class="row justify-content-center">
                        {this.getReqLeaveData()}
                    </div>
                </div>
            </>
        );
    }
}

export default EmployeeReqLeave;