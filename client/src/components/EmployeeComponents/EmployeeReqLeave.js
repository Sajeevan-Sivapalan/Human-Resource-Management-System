import axios from "axios";
import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
        axios.get(`http://localhost:5000/EmployeeReqLeave`).then(res => {
            //console.table(res.data)
            this.setState({
                empLeaveData: res.data
            })
            this.filterContent(res.data, this.state.empID);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    filterContent(empLeaveData, searchEmp) {
        const result = empLeaveData.filter((empLeaveData) => empLeaveData.empID.includes(searchEmp));
        this.setState({empLeaveData:result});
    }

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