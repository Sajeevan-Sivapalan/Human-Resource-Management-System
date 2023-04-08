import axios from "axios";
import React, { Component } from "react";

class AdminEmpLeaveList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ''
        };
    }

    acceptLeave = (id) => {
        const leaveObj = {
            status: "accepted"
        }
        axios.put(`http://localhost:5000/AdminReqLeave//updateEmpLeave/${id}`, leaveObj).then(() => {
            window.location.replace("http://localhost:3000/admin/AdminReqLeave");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    rejectLeave = (id) => {
        const leaveObj = {
            status: "rejected"
        }
        axios.put(`http://localhost:5000/AdminReqLeave/updateEmpLeave/${id}`, leaveObj).then(() => {
            window.location.replace("http://localhost:3000/admin/AdminReqLeave");
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
                            <h5 class="card-title">Employee ID : {this.props.obj.empID}</h5>
                            <h5 class="card-title">First Name : {this.props.obj.fName}</h5>
                            <h5 class="card-title">Leave Type : {this.props.obj.leaveType}</h5>
                            <h6 class="card-text">Starting Date : {this.props.obj.sDate}</h6>
                            <h6 class="card-text">Ending Date : {this.props.obj.eDate}</h6>
                            <h6 class="card-text">Reason : {this.props.obj.reason}</h6>
                            
                            <div class="request-leave">
                                <div class="row justify-content-start">
                                    <div type="button" class="btn btn-status btn-outline-secondary col-2 ">
                                        {this.props.obj.status}
                                    </div>
                                </div>
                                <div class="row justify-content-end">
                                    <button type="button" class="btn btn-primary col-2 " onClick={() => this.acceptLeave(this.props.obj._id)}>
                                        Accept
                                    </button>
                                    <button type="button" class="btn btn-danger col-2 " onClick={() => this.rejectLeave(this.props.obj._id)}>
                                        Reject
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

export default AdminEmpLeaveList;