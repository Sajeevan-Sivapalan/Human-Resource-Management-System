import React, { useState } from "react";
import QRCode from 'qrcode.react';

function CreateEmpQR() {
    const [empID, setEmpID] = useState("");

    const generateEmployeeQR = (event) => {
        setEmpID(event.target.value);
    }

    // download QR
    const downloadQR = () => {
        var qrURL = document.getElementById('QRcodeImg');
        var pngUrl = qrURL.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
        let dL = document.createElement("a");
        dL.href = pngUrl;
        dL.download = `${empID}.png`;
        document.body.appendChild(dL);
        dL.click();
        document.body.removeChild(dL);
    }
    
    return(
        <>
            
            <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#ReqLeaveForm">
                Create QR for Employee
            </button>
            <div class="modal fade" id="ReqLeaveForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Generate QR Code For Employee</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row ">
                            <QRCode id="QRcodeImg" value={empID} level={"H"} includeMargin={true} />
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