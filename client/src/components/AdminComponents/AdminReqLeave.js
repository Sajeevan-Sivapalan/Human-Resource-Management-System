import React, { Component } from "react";
import axios from "axios";
import AdminEmpLeaveList from "./AdminEmpLeaveList";
import {Link} from "react-router-dom";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

class AdminReqLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empLeaveData: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/AdminReqLeave').then(res => {
            this.setState({
                empLeaveData: res.data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    searchReqLeaveData = (event) => {
        
        const searchReqLeave = event.currentTarget.value;
        //console.log(searchReqLeave);
        axios.get(`http://localhost:5000/AdminReqLeave`).then(res => {
                this.filterContent(res.data, searchReqLeave);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    filterContent(empLeaveData, searchReqLeave) {
        const result = empLeaveData.filter((empLeaveData) => empLeaveData.empID.includes(searchReqLeave));
        this.setState({empLeaveData:result});
    }

    getData = () => {
        return this.state.empLeaveData.map((res, index) => {
            return <AdminEmpLeaveList obj={res} key={index} />
        }
    )}

    render() {
        return(
            <>
                <div class="search">
                    <div class="row justify-content-center">
                        <input type="text" class="form-control search-bar" placeholder="Search By Employee ID"  onChange={this.searchReqLeaveData } />
                    </div>
                </div>
                <div>
                    <div class="leave-list">
                        <div class="row justify-content-center">
                            {this.getData()}
                        </div>
                    </div>
                </div>
            </>
            
        );
    }
}

export default AdminReqLeave;