import axios from "axios";
import React, { Component } from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class EmployeeLeaveList extends Component {
    
    deleteLeave = (id) => {
        var result = window.confirm('Do you want to cancel this request ?');

        if(result == true) {
            axios.delete(`http://localhost:5000/EmployeeReqLeave/deleteEmpLeave/${id}`).then(() => {
                window.location.replace("http://localhost:3000/EmployeeReqLeave");
            })
        }
    }

    render() {
        return(
            <>
                <div class="col-6">
                     <div class="card">
                        <h5 class="card-header">Request Leave</h5>
                        <div class="card-body">
                            <h5 class="card-title">Employee ID : {this.props.obj.empID}</h5>
                            <h5 class="card-title">First Name : {this.props.obj.fName}</h5>
                            <p class="card-text">Reason : {this.props.obj.reason}</p>
                            <button type="button" class="btn btn-status btn-outline-secondary col-2 ">
                                {this.props.obj.status}
                            </button>
                            <div class="request-leave">
                                <div class="row justify-content-end">
                                    <button type="button" class="btn btn-danger col-2 " onClick={() => this.deleteLeave(this.props.obj._id)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default EmployeeLeaveList;