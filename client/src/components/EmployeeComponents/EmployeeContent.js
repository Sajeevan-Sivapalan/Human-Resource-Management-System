import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeeReqLeave from "./EmployeeReqLeave";
import EmpViewPayroll from "../employeeViewPayroll";
import EmpIndPayroll from "../empIndividualPayroll";
import EmpIndPaySlips from "../empIndPaySlip";
import AddApplyTransport from "../Transport/AddApplyTransport";

function EmployeeContent() {
    return(
        <div class="content">
            <Routes>
                <Route>
                    <Route path="EmployeeReqLeave" element={<EmployeeReqLeave />} />
                    <Route path="EmployeeViewPayroll" element={<EmpViewPayroll />} />
                    <Route path="EmpIndPayroll/:id" element={<EmpIndPayroll />} />
                    <Route path="EmpIndPayslip" element={<EmpIndPaySlips />} />
                    <Route path="EmployeeAddTransport" element={<AddApplyTransport />} />
                </Route>
            </Routes>
        </div>
    );
}

export default EmployeeContent;