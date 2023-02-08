import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminReqLeave from "./AdminReqLeave";
import AdminReqLeaveSearch from "./AdminReqLeaveSearch";

function AdminContent() {
    return(
        <div class="content">
            <Routes>
                <Route>
                    <Route path="/AdminReqLeave" element={<AdminReqLeave />} />
                    <Route path="/AdminReqLeave/Search" element={<AdminReqLeaveSearch />} />
                </Route>
            </Routes>
        </div>
    );
}

export default AdminContent;