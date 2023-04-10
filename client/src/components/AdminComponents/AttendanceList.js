import { Component } from "react";
import axios from "axios";

class AttendanceList extends Component {
    constructor(props) {
        super(props);
    }

    deleteAttendanceRecord = (id) => {
        var result = window.confirm('Do you want to add to suspicious this record?');

        if(result == true) {
            const suspiciousAttendanceObj = {
                empID: this.props.obj.empID,
                date: this.props.obj.date,
                enterTime: this.props.obj.enterTime,
                exitTime: this.props.obj.exitTime,
                timeDifference: this.props.obj.timeDifference
              };

              // add leave record to suspicious 
              axios.post('http://localhost:5000/SuspiciousEmpLeave/addSuspiciousLeaveRecord', suspiciousAttendanceObj).then(res => {

                })
                .catch((err) => {
                    console.log(err);
                })

            // delete leave record  
            axios.delete(`http://localhost:5000/Attendance/deleteAttendance/${id}`).then(() => {
                window.location.replace("http://localhost:3000/admin/Attendance");
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
                    <td>{this.props.obj.timeDifference}</td>
                    <td><button class="btn btn-danger" onClick={() => this.deleteAttendanceRecord(this.props.obj._id)}>Suspicious</button></td>
                </tr>
            </>
        );
    }
}

export default AttendanceList;