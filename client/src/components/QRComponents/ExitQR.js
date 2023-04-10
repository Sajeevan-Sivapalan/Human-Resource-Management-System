import React, { Component } from "react";
import QrReader from "modern-react-qr-reader";
import axios from "axios";
import ExitQRUpd from "./ExitQRUpd";

class ExitQR extends Component {
    constructor(props) {
        super(props);
        this.state ={
          attendanceData: []
        }
    }

    // scan exit QR value and get all record
    scanQR = (data) => {
        if (data) {
          const currentDateTime = new Date();
          const date = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth()+1}-${currentDateTime.getDate()}`; // get current date
          alert("Thank you " + data);
          
        // get all attendance record and sending to filterContent method
          axios.get(`http://localhost:5000/Attendance`).then(res => {
            this.filterContent(res.data, date, data);
          })
          .catch((err) => {
              console.log(err);
          })
        }
      };

      // filter data for employee id and date for update exit time
      filterContent(attendanceData, date, data) {
        const result = attendanceData.filter((attendanceData) => attendanceData.empID.includes(data));
        this.setState({attendanceData:result});
        const result1 = attendanceData.filter((attendanceData) => attendanceData.date.includes(date));
        this.setState({attendanceData:result1});
      }
    
      // show any errors in qr reader
      onScanError = (err) => {
        console.error(err);
      };

      // mapping to ExitQRUpd the record
      getAttendanceData = () => {
        return this.state.attendanceData.map((res, index) => {
            return <ExitQRUpd obj={res} key={index} />
        }
      )}

    render() {
          return (
            <>
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
              <div>
                {this.getAttendanceData()}
              </div>
            </>
          );
    }
}

export default ExitQR;