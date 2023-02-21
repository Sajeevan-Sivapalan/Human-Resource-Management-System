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

          const attendanceObj = {
            exitTime: time
          };

          axios.get(`http://localhost:5000/Attendance/${data}/${date}`).then(res => {
            alert("data");
            console.log(res.data);
            this.setState({
              attendanceData: res.data
            });
            alert("1" + res._id);
            alert("2" + res.data._id);
            axios.put(`http://localhost:5000/Attendance//updateEmpLeave/${this.state._id}`, attendanceObj  ).then(() => {
              alert("abnd");
              window.location.replace("http://localhost:3000/exitQR");
            })
            .catch((err) => {
                console.log(err);
            })
            //alert("THANK YOU " + data);
            //window.location.replace("http://localhost:3000/exitQR");
            //this.filterContent(res.data, date);
        })
        .catch((err) => {
            console.log(err);
        })
        }
      };
    
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

export default ExitQR;