import React, { Component } from "react";
import QrReader from "modern-react-qr-reader";
import axios from "axios";

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

          axios.get(`http://localhost:5000/Attendance/${data}`).then(res => {
                this.filterContent(res.data, date);
                alert(this.props.empID);
                alert(this.state.empID);
            //alert("THANK YOU " + data);
            //window.location.replace("http://localhost:3000/exitQR");
            //this.filterContent(res.data, date);
        })
        .catch((err) => {
            console.log(err);
        })
        }
      };

      filterContent(attendanceData, date) {
        const result = attendanceData.filter((attendanceData) => attendanceData.empID.includes(date));
        this.setState({attendanceData:result});
    }
    
      onScanError = (err) => {
        console.error(err);
      };

    render() {
          return (
            <>
              <React.Fragment>
              <div class="QR-scanner-position">
                <div class="QR-scanner">
                  <QrReader
                    delay={100}
                    onError={this.onScanError}
                    onScan={this.scanQR}
                  />
                </div>
                </div>
              </React.Fragment>
            </>
          );
    }
}

export default ExitQR;