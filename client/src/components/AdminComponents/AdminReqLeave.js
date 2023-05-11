import React, { Component } from "react";
import axios from "axios";
import AdminEmpLeaveList from "./AdminEmpLeaveList";

class AdminReqLeave extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empLeaveData: []
        }
        document.title = 'Leave Request';
    }

    componentDidMount() {
        // get all employee leave request 
        axios.get('http://localhost:5000/AdminReqLeave').then(res => {
            this.setState({
                empLeaveData: res.data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    // search using employee id
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

    // filter data for employee id 
    filterContent(empLeaveData, searchReqLeave) {
        const result = empLeaveData.filter((empLeaveData) => empLeaveData.empID.includes(searchReqLeave));
        this.setState({empLeaveData:result});
    }

     // mapping to AdminEmpLeaveList the record
    getReqLeaveData = () => {
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
                            {this.getReqLeaveData()}
                        </div>
                    </div>
                </div>
            </>
            
        );
    }
}

export default AdminReqLeave;