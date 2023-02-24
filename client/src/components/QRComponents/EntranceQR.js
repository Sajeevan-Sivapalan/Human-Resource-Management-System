import React, { Component } from "react";
import QrReader from "modern-react-qr-reader";
import axios from "axios";

class EntranceQR extends Component {
    constructor(props) {
        super(props);
    }

    scanQR = (data) => {
        if (data) {
          const currentDateTime = new Date();
          const date = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth()+1}-${currentDateTime.getDate()}`;
          const time = currentDateTime.toLocaleTimeString("en-US");

          /*const attendanceObj = {
            empID: data,
            date: date,
            enterTime: time
          };*/

          axios.get(`http://localhost:5000/Attendance`).then(res => {
                this.filterContent(res.data, date, time, data);
          })
          .catch((err) => {
              console.log(err);
          })
        }
      };

      filterContent(attendanceData, date, time, data) {
        const result = attendanceData.filter((attendanceData) => attendanceData.empID.includes(data));
        this.setState({attendanceData:result});
        const result1 = attendanceData.filter((attendanceData) => attendanceData.date.includes(date));
        this.setState({attendanceData:result1});

        if(result1 == ""){
          const attendanceObj = {
            empID: data,
            date: date,
            enterTime: time,
            exitTime: ""
          };
          axios.post('http://localhost:5000/Attendance/AttendanceEntry', attendanceObj).then(res => {
            alert("WELCOME " + data);
            window.location.replace("http://localhost:3000/readQR");
            })
            .catch((err) => {
                console.log(err);
            })
        }
        else{
          alert("Already your entry recorded successfully");
          window.location.replace("http://localhost:3000/readQR");
        }
      }
    
      onScanError = (err) => {
        console.error(err);
      };

    render() {
          return (
            <React.Fragment>
              <div class="QR-scanner-position">
                <div class="QR-scanner">
                  <QrReader
                    delay={500}
                    onError={this.onScanError}
                    onScan={this.scanQR}
                  />
                </div>
              </div>
            </React.Fragment>
          );
    }
}

export default EntranceQR;