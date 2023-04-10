import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminReqLeave from "./AdminReqLeave";
import Attendance from "./Attendance";

function AdminContent() {
    return(
        <div class="content">
            <Routes>
                <Route>
                    <Route path="/AdminReqLeave" element={<AdminReqLeave />} />
                    <Route path="/Attendance" element={<Attendance />} />
                </Route>
            </Routes>
        </div>
    );
}

export default AdminContent;