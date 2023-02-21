import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminReqLeave from "./AdminReqLeave";
import Attendance from "./Attendance";
import EntranceQR from "../QRComponents/EntranceQR";
import ExitQR from "../QRComponents/ExitQR";

function AdminContent() {
    return(
        <div class="content">
            <Routes>
                <Route>
                    <Route path="/exitQR" element={<ExitQR />} />
                    <Route path="/AdminReqLeave" element={<AdminReqLeave />} />
                    <Route path="/Attendance" element={<Attendance />} />
                    <Route path="/readQR" element={<EntranceQR />} />
                </Route>
            </Routes>
        </div>
    );
}

export default AdminContent;