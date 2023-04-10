import { Component } from "react";
import axios from "axios";

class ExitQRUpd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exitTime: ''
        }
    }

    // update exit time and duration
    updateExitTime = (id) => {
        // check whether already exited or not 
        if(this.props.obj.exitTime != ""){
            alert("already exited");
            window.location.replace("http://localhost:3000/exitQR");
        }
        else {
            const currentDateTime = new Date();
            const entryTimeFor = new Date();
            const exitTimeFor = new Date();
            const time = currentDateTime.toLocaleTimeString("en-US"); // get current time

            //convert entry time => string to time format 
            const entryT = this.props.obj.enterTime;
            const entryTime = entryT.match(/^(\d{1,2}):(\d{2}):(\d{2})\s+(AM|PM)$/i);
            const hours = parseInt(entryTime[1], 10) + (entryTime[4].toLowerCase() === 'pm' ? 12 : 0);
            const minutes = parseInt(entryTime[2], 10);
            const seconds = parseInt(entryTime[3], 10);
            entryTimeFor.setHours(hours);
            entryTimeFor.setMinutes(minutes);
            entryTimeFor.setSeconds(seconds);

            // convert the duration to time format 
            const entryTimeFormat = entryTimeFor.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

            // convert exit time => string to time format 
            const curTime = new Date(`January 1, 1970 ${time}`);

            // calculate time difference
            const timeDifference = curTime.getTime() - entryTimeFor.getTime();

            // convert time difference => string to time format 
            const timeDifferenceObj = new Date(timeDifference);
            const hours1 = timeDifferenceObj.getUTCHours();
            const minutes1 = timeDifferenceObj.getUTCMinutes();
            const seconds1 = timeDifferenceObj.getSeconds();
            exitTimeFor.setHours(hours1);
            exitTimeFor.setMinutes(minutes1);
            exitTimeFor.setSeconds(seconds1);

            // convert the duration to time format 
            const timeDifferentFormat = exitTimeFor.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });

            const attendanceObj = {
                exitTime: time,
                timeDifference: timeDifferentFormat
            };

            // update exit time and duration for particular employee and date 
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