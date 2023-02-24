import React, { Component, useState } from "react";
import QRCode from "react-qr-code";


function CreateEmpQR() {
    const [empID, setEmpID] = useState("");

    const generateEmployeeQR = (event) => {
        setEmpID(event.target.value);
    }

    const downloadQR = () => {
        var qrURL = document.getElementById('QRcodeImg');
        var pngUrl = qrURL.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
        //alert(qrURL);
        console.log(qrURL)
        let aEl = document.createElement("a");
        aEl.href = pngUrl;
        aEl.download = `${empID}.png`;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
    }
    return(
        <>
            <div class="request">
                <div class="row justify-content-end">
                    <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#ReqLeaveForm">
                        Create QR for Employee
                    </button>
                </div>
            </div>
            <div class="modal fade" id="ReqLeaveForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Generate QR Code for Employee</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row ">
                            <QRCode id="QRcodeImg" value={empID} />
                            <div>
                                <input type="text" class="form-control" value={empID} onChange={(event) =>{generateEmployeeQR(event)}} placeholder="Enter Employee ID" />
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <input type="button" class="btn btn-primary" value="Download" onClick={downloadQR} />
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                     </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateEmpQR;