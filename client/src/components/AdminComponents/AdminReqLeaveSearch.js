import React, { Component, useState } from "react";
import axios from "axios";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import AdminEmpLeaveList from "./AdminEmpLeaveList";

class AdminReqLeaveSearch extends Component {
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

    filterContent(empLeaveData, searchItem) {
        const result = empLeaveData.filter((empLeaveData) => empLeaveData.empID.includes(searchItem));
        this.setState({empLeaveData:result});
    }

    searchData = (event) => {
        
        const searchItem = event.currentTarget.value;
        //console.log(searchItem);
        axios.post(`http://localhost:5000/AdminReqLeave`).then(res => {
                this.filterContent(res.data.empLeaveData, searchItem);
        })
        .catch((err) => {
            console.log(err);
        })
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
                    <input type="text" onChange={this.searchData } />
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

export default AdminReqLeaveSearch;