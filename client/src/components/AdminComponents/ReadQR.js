import React, { Component } from "react";
import QrReader from "modern-react-qr-reader";

class ReadQR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            empID: ''
        }
    }

    scanQR = (data) => {
        if (data) {
          alert(data);
          this.setState({
            empID: data
          });
          //alert(this.state.empID);
          //console.log(this.state.empID);
          // this.setState({result: data});
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

export default ReadQR;