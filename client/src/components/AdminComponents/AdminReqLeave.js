import React, { Component } from "react";
import axios from "axios";
import AdminEmpLeaveList from "./AdminEmpLeaveList";

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

    getData() {
        return this.state.empLeaveData.map((res, index) => {
            return <AdminEmpLeaveList obj={res} key={index} />
        }
    )}

    render() {
        return(
            <div>
                <div class="leave-list">
                    <div class="row justify-content-center">
                        {this.getData()}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminReqLeave;