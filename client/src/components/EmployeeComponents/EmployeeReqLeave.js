import axios from "axios";
import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { renderMatches } from "react-router-dom";
import EmployeeReqLeaveForm from "./EmployeeReqLeaveForm";
import EmployeeLeaveList from "./EmployeeLeaveList";

class EmployeeReqLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empLeaveData: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/EmployeeReqLeave').then(res => {
            //console.table(res.data)
            this.setState({
                empLeaveData: res.data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getData() {
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
                        {this.getData()}
                    </div>
                </div>
            </>
        );
    }
}

export default EmployeeReqLeave;