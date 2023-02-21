import React, { Component } from "react";
import QrReader from "modern-react-qr-reader";
import axios from "axios";
import Test from "./Test";

class ExitQR extends Component {
    constructor(props) {
        super(props);
        this.state ={
          attendanceData: []
        }
    }

    scanQR = (data) => {
        if (data) {
          const currentDateTime = new Date();
          const date = `${currentDateTime.getFullYear()}-${currentDateTime.getMonth()+1}-${currentDateTime.getDate()}`;
          const time = currentDateTime.toLocaleTimeString("en-US");
          alert("Enter" + data);
          const attendanceObj = {
            exitTime: time
          };

          axios.get(`http://localhost:5000/Attendance`).then(res => {
            alert("enter get");
            this.filterContent(res.data, date, data);
            //alert(this.props.empID);
            //alert(this.state.empID);
            //alert("THANK YOU " + data);
            //window.location.replace("http://localhost:3000/exitQR");
            //this.filterContent(res.data, date);
        })
        .catch((err) => {
            console.log(err);
        })
        }
      };

      filterContent(attendanceData, date, data) {
        const result = attendanceData.filter((attendanceData) => attendanceData.empID.includes(data));
        this.setState({attendanceData:result});
        const result1 = attendanceData.filter((attendanceData) => attendanceData.date.includes(date));
        this.setState({attendanceData:result1});
        
      }
    
      onScanError = (err) => {
        console.error(err);
      };

      getAttendanceData = () => {
        return this.state.attendanceData.map((res, index) => {
            return <Test obj={res} key={index} />
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