import { Component } from "react";
import axios from "axios";

class ExitQRUpd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exitTime: ''
        }
    }

    updateExitTime = (id) => {
        if(this.props.obj.exitTime != ""){
            alert("already exited");
            window.location.replace("http://localhost:3000/exitQR");
        }
        else {
            const currentDateTime = new Date();
            const time = currentDateTime.toLocaleTimeString("en-US");

            const attendanceObj = {
                exitTime: time
            };

            axios.put(`http://localhost:5000/Attendance/updateAttendance/${id}`, attendanceObj).then(() => {
                window.location.replace("http://localhost:3000/exitQR");
            })
            .catch((err) => {
                console.log(err);
            })
        }
    };

    render() {
        return(
            <>
                    {this.updateExitTime(this.props.obj._id)}
            </>
        );
    }
}

export default ExitQRUpd;