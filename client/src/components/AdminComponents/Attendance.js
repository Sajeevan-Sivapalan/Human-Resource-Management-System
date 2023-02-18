import React, { Component, useState } from "react";
import QRCode from "react-qr-code";
import CreateEmpQR from "./CreateEmpQR";


class Attendance extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <>
                <CreateEmpQR></CreateEmpQR>
                
            </>
        );
    }
}

export default Attendance;