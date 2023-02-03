import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";

class EmployeeReqLeaveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empID: '',
            fName: '',
            sDate: '',
            eDate: '',
            reason: '',
            status: ''
        }
    }

    onChangeEmpID = (event) => {
        this.setState({name:event.target.value});
    }

    onChangeFName = (event) => {
        this.setState({fName:event.target.value});
    }

    onChangeSDate = (event) => {
        this.setState({sDate:event.target.value});
    }

    onChangeEDate = (event) => {
        this.setState({eDate:event.target.value});
    }

    onChangeReason = (event) => {
        this.setState({reason:event.target.value});
    }

    reqLeave = (event) => {
        event.preventDefault();
        const leaveObj = {
            empID: this.state.empID,
            fName: this.state.fName,
            sDate: this.state.sDate,
            eDate: this.state.eDate,
            reason: this.state.reason,
            status: "pending"
        }
        axios.post('http://localhost:5000/EmployeeReqLeave/reqEmpLeave', leaveObj).then(res => {
            console.log(res.data);
            window.location.replace("http://localhost:3000/EmployeeReqLeave");
        })
        .catch((err) => {
            console.log(err);
        })

        this.state({
            empID: '',
            fName: '',
            sDate: '',
            eDate: '',
            reason: '',
            status: ''
        })
    }

    render() {
        return(
            <>
            <div class="request-leave">
                <div class="row justify-content-end">
                    <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#ReqLeaveForm">
                        Request Leave
                    </button>
                </div>
            </div>
            <div class="modal fade" id="ReqLeaveForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Request Leave</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <Form onSubmit={this.reqLeave}>
                            <div class="row">
                                <div class="col-6">
                                    <label class="form-label">Employee ID</label>
                                    <Form.Control type="text" class="form-control" value={this.state.empID} onChange={this.onChangeEmpID} />
                                </div>
                                <div class="col-6">
                                    <label class="form-label">First Name</label>
                                    <Form.Control type="text" class="form-control" value={this.state.fName} onChange={this.onChangeFName} />
                                    <div class="form-feedback">
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label class="form-label">Starting Date</label>
                                    <Form.Control type="date" class="form-control" value={this.state.sDate} onChange={this.onChangeSDate} />
                                </div>
                                <div class="col-6">
                                    <label class="form-label">End Date</label>
                                    <Form.Control type="date" class="form-control" value={this.state.eDate} onChange={this.onChangeEDate} />
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Reason</label>
                                    <textarea class="form-control" rows="3" value={this.state.reason} onChange={this.onChangeReason} ></textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                    <input type="submit" class="btn btn-primary" />
                                </div>
                            </div>
                        </Form>
                    </div>
                    </div>
                </div>
            </div>
        </>
        );
    }
}
 
export default EmployeeReqLeaveForm;
