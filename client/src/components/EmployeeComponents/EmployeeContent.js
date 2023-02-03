import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeePanel from "./EmployeePanel";
import EmployeeReqLeave from "./EmployeeReqLeave";

function EmployeeContent() {
    return(
        <div class="content">
            <Routes>
                <Route>
                    <Route path="/EmployeeReqLeave" element={<EmployeeReqLeave />} />
                    <Route path="/EmployeePanel" element={<EmployeePanel />} />
                </Route>
            </Routes>
        </div>
    );
}

export default EmployeeContent;