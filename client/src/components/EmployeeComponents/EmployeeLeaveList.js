import axios from "axios";
import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from "react-router-dom";

class EmployeeLeaveList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reason: ''
        }
    }

    onChangeReason = (event) => {
        this.setState({reason:event.target.value});
    }

    deleteLeave = (id) => {
        var result = window.confirm('Do you want to cancel this request ?');

        if(result == true) {
            axios.delete(`http://localhost:5000/EmployeeReqLeave/deleteEmpLeave/${id}`).then(() => {
                window.location.replace("http://localhost:3000/emp/EmployeeReqLeave");
            })
        }
    }

    updateReqLeave = (id) => {
        const leaveObj = {
            reason: this.state.reason
        }
        axios.put(`http://localhost:5000/AdminReqLeave/updateEmpLeave/${id}`, leaveObj).then(() => {
            window.location.replace("http://localhost:3000/emp/EmployeeReqLeave");
        })
        .catch((err) => {
            console.log(err);
        })
    }


    render() {
        return(
            <>
                <div class="col-6">
                     <div class="card">
                        <h5 class="card-header">Request Leave</h5>
                        <div class="card-body">
                            <h6 class="card-title">Employee ID : {this.props.obj.empID}</h6>
                            <h6 class="card-title">First Name : {this.props.obj.fName}</h6>
                            <h6 class="card-title">Leave Type : {this.props.obj.leaveType}</h6>
                            <div class="row">
                                <h6 class="card-text col-3">Reason : </h6>
                                <textarea class="form-control col-6" onChange={this.onChangeReason}>{this.props.obj.reason}</textarea>
                            </div>
                            <button type="button" class="btn btn-status btn-outline-secondary">
                                <h5>Status : {this.props.obj.status}</h5>
                            </button>
                        </div>
                        <div class="card-footer">
                            <div class="row justify-content-end">
                                <button type="button" class="btn btn-primary col-2 " disabled={this.props.obj.status != "pending"} onClick={() => this.updateReqLeave(this.props.obj._id)}>
                                    Update
                                </button>
                                <button type="button" class="btn btn-danger col-2 " onClick={() => this.deleteLeave(this.props.obj._id)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default EmployeeLeaveList;