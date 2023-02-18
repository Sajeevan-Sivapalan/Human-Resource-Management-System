import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeeReqLeave from "./EmployeeReqLeave";

function EmployeeContent() {
    return(
        <div class="content">
            <Routes>
                <Route>
                    <Route path="/EmployeeReqLeave" element={<EmployeeReqLeave />} />
                </Route>
            </Routes>
        </div>
    );
}

export default EmployeeContent;