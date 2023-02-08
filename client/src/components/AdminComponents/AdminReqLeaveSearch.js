import React, { Component } from "react";
import axios from "axios";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class AdminReqLeaveSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empID: ''
        }
    }

    onChangeEmpID = (event) => {
        this.setState({empID:event.target.value});
    }

    searchReq = (event) => {
        event.preventDefault();
        //alert(this.state.empID);
        axios.post(`http://localhost:5000/AdminReqLeave/Search/${this.state.empID}`).then(res => {
            console.log(res.data);
            window.location.replace("http://localhost:3000/AdminReqLeave");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    render() {
        return(
            <div class="search">
                <Form onSubmit={this.searchReq}>
                    <div class="row justify-content-center">
                        <div class="col-2">
                            <Form.Control type="text" class="form-control col-3" value={this.state.empID} onChange={this.onChangeEmpID} placeholder="Search by empID"/>
                        </div>
                        <input type="submit" class="btn btn-primary col-1" value="Search" />
                    </div>
                </Form>
            </div>
        );
    }
}

export default AdminReqLeaveSearch;