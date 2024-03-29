import React, { Component } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

class EmployeeReqLeaveForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empID: '',
            username: '',
            leaveType:'',
            sDate: '',
            eDate: '',
            reason: '',
            status: '',
            errorEmpID: false,
            errorFName: false,
            errorLeaveType: false,
            errorDate: false,
            errorReason: false
        }
    }

    onChangeEmpID = (event) => {
        this.setState({empID:event.target.value});

        var errorMessage = document.getElementById("errMsgEmpID");
        if(this.state.empID[0] != "U"){
            errorMessage.innerHTML = "Employee Id should start with U";
            this.setState({errorEmpID: false});
        }
        else
        if(this.state.empID.length < 4) {
            errorMessage.innerHTML = "The minimum length of employee id should be 5";
            this.setState({errorEmpID: false});
        }
        else {
            errorMessage.innerHTML = "";
            this.setState({errorEmpID: true});
        }
    }

    onChangeFName = (event) => {
        this.setState({username:event.target.value});

        var errorMessage = document.getElementById("errMsgFName");
        if(this.state.username.length < 2){
            errorMessage.innerHTML = "The minimum length of user name should be 3";
            this.setState({errorFName: false});
        }
        else {
            errorMessage.innerHTML = "";
            this.setState({errorFName: true});
        }
            
    }

    onChangeLeaveType = (event) => {
        this.setState({leaveType:event.target.value});

        var errorMessage = document.getElementById("errMsgLT");
        if(this.state.leaveType == " ") {
            errorMessage.innerHTML = "Select Leave type";
            this.setState({errorLeaveType: false})
        }
        else {
            errorMessage.innerHTML = "";
            this.setState({errorLeaveType: true})
        }
    }

    onChangeSDate = (event) => {
        this.setState({sDate:event.target.value});
    }

    onChangeEDate = (event) => {
        this.setState({eDate:event.target.value});

    }

    onChangeReason = (event) => {
        this.setState({reason:event.target.value});

        const startDay = new Date(this.state.sDate);
        const endingDay = new Date(this.state.eDate);
        
        var dayDifferent = Math.ceil((endingDay.getTime() - startDay.getTime()) / (1000 * 3600 * 24));
        var errorMessage1 = document.getElementById("errMsgDate");
        if(dayDifferent < 0) {
            
            errorMessage1.innerHTML = "Invalid date selection";
            this.setState({errorDate: false});
            
            var errorMessage = document.getElementById("errMsgReason");
            if(this.state.reason.length < 2){
                errorMessage.innerHTML = "The minimum length of reason should be 3";
                this.setState({errorReason: false});
            }
            else {
                errorMessage.innerHTML = "";
                this.setState({errorReason: true});
            }
        }
        else {
            this.setState({errorDate: true});
            errorMessage1.innerHTML = "";
            
            var errorMessage = document.getElementById("errMsgReason");
            if(this.state.reason.length < 2){
                errorMessage.innerHTML = "The minimum length of reason should be 3";
                this.setState({errorReason: false});
            }
            else {
                errorMessage.innerHTML = "";
                this.setState({errorReason: true});
            }
        }
    }

    // check box will not enable if there are any errors in input 
    chcCheck = (event) => {
        var chcBtn = document.getElementById("chcBox");
        var subButton = document.getElementById("LRFsubmit");

        if(chcBtn.checked == true) {
            var errorMessage = document.getElementById("errChcBox");
            if(this.state.errorEmpID == true && this.state.errorFName == true && this.state.errorLeaveType == true && this.state.errorDate == true && this.state.errorReason == true){
                subButton.disabled = false;
                errorMessage.innerHTML = "";
            }
            else{
                errorMessage.innerHTML = "Fill all the fields";
                subButton.disabled = true;
                chcBtn.checked = false;
            }
        }
        else
            subButton.disabled = false;
    }

    // create a employee leave request
    reqLeave = (event) => {
        event.preventDefault();
        const leaveObj = {
            empID: this.state.empID,
            username: this.state.username,
            leaveType: this.state.leaveType,
            sDate: this.state.sDate,
            eDate: this.state.eDate,
            reason: this.state.reason,
            status: "pending"
        }

        // create a employee leave request 
        axios.post('http://localhost:5000/EmployeeReqLeave/reqEmpLeave', leaveObj).then(res => {
            console.log(res.data);
            window.location.replace("http://localhost:3000/dash/emp/EmployeeReqLeave");
        })
        .catch((err) => {
            console.log(err);
        })

        this.state({
            empID: '',
            username: '',
            leaveType: '',
            sDate: '',
            eDate: '',
            reason: '',
            status: ''
        })
    }

    render() {
        return(
            <>
            <div class="request">
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
                                    <div class="form-feedback">
                                        <span id="errMsgEmpID"></span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label class="form-label">User Name</label>
                                    <Form.Control type="text" class="form-control" value={this.state.username} onChange={this.onChangeFName} />
                                    <div class="form-feedback">
                                        <span id="errMsgFName"></span>
                                    </div>
                                </div>
                                <div class="form-ddb col-12">
                                <label class="form-label">Leave Type</label>
                                <Form.Select onChange={this.onChangeLeaveType}>
                                    <option value=" ">Select Leave Type</option>
                                    <option value="Casual Leave">Casual Leave</option>
                                    <option value="Medical Leave">Medical Leave</option>
                                    <option value="Marriage leave">Marriage leave</option>
                                </Form.Select>
                                <div class="form-feedback">
                                        <span id="errMsgLT"></span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label class="form-label">Starting Date</label>
                                    <Form.Control type="date" class="form-control" value={this.state.sDate} onChange={this.onChangeSDate} required />
                                </div>
                                <div class="col-6">
                                    <label class="form-label">End Date</label>
                                    <Form.Control type="date" class="form-control" value={this.state.eDate} onChange={this.onChangeEDate} required />
                                    <div class="form-feedback">
                                        <span id="errMsgDate"></span>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Reason</label>
                                    <textarea class="form-control" rows="3" value={this.state.reason} onChange={this.onChangeReason} ></textarea>
                                    <div class="form-feedback">
                                        <span id="errMsgReason"></span>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div   div class="form-check">
                                        <Form.Check class="form-check-input" type="checkbox" id="chcBox" onChange={this.chcCheck} />
                                        <label class="form-label" for="flexCheckChecked" >
                                            I accept terms and conditions
                                        </label>
                                        <div class="form-feedback">
                                            <span id="errChcBox"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                    <input type="submit" class="btn btn-primary" disabled={true} id="LRFsubmit" />
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
