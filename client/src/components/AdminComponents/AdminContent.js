import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminReqLeave from "./AdminReqLeave";

function AdminContent() {
    return(
        <div class="content">
            <Routes>
                <Route>
                    <Route path="/AdminReqLeave" element={<AdminReqLeave />} />
                </Route>
            </Routes>
        </div>
    );
}

export default AdminContent;