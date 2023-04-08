import React from "react";
import AdminPanel from "../AdminComponents/AdminPanel";
import { Route, Routes, Outlet } from "react-router-dom";
import EmployeePanel from "../EmployeeComponents/EmployeePanel";
import AdminReqLeave from "../AdminComponents/AdminReqLeave";
import ExitQR from "../QRComponents/ExitQR";
import Attendance from "../AdminComponents/Attendance";
import EntranceQR from "../QRComponents/EntranceQR";
import EmployeeReqLeave from "../EmployeeComponents/EmployeeReqLeave";

function ViewDisplay() {
    return(
        <div class="view-display">
            <Routes>
                <Route path="/admin" element={<AdminPanel />}>
                    <Route exact path="/admin/AdminReqLeave" element={<AdminReqLeave />} />
                    <Route exact path="/admin/Attendance" element={<Attendance />} />
                </Route>
                <Route path="/emp" element={<EmployeePanel />}>
                    <Route path="/emp/EmployeeReqLeave" element={<EmployeeReqLeave />} />
                </Route>
                <Route exact path="/readQR" element={<EntranceQR />} />
                <Route exact path="/exitQR" element={<ExitQR />} />
            </Routes>
        </div>
    );
}

export default ViewDisplay;