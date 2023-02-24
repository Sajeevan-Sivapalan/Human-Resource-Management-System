import { Component } from "react";
import axios from "axios";

class AttendanceList extends Component {
    constructor(props) {
        super(props);
    }

    deleteAttendanceRecord = (id) => {
        var result = window.confirm('Do you want to remove this record ?');

        if(result == true) {
            axios.delete(`http://localhost:5000/Attendance/deleteAttendance/${id}`).then(() => {
                window.location.replace("http://localhost:3000/Attendance");
            })
        }
    }

    render() {
        return(
            <>
                <tr>
                    <th scope="row">{this.props.obj.empID}</th>
                    <td>{this.props.obj.date}</td>
                    <td>{this.props.obj.enterTime}</td>
                    <td>{this.props.obj.exitTime}</td>
                    <td><button class="btn btn-danger" onClick={() => this.deleteAttendanceRecord(this.props.obj._id)}>Delete</button></td>
                </tr>
            </>
        );
    }
}

export default AttendanceList;