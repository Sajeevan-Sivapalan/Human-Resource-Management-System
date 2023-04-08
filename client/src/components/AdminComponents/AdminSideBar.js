import React from "react";
import {Link} from "react-router-dom";
function AdminSideBar() {
    return(
        <div class="nav flex-column nav-pills bg-light sidebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <Link class="nav-link" to="/exitQR">Exit</Link>
            <Link class="nav-link" to="/readQR">Entry</Link>
            <Link class="nav-link" to="/admin/Attendance">Attendance</Link>
            <Link class="nav-link" to="/admin/AdminReqLeave">Leave Request</Link>
        </div>
    );
}

export default AdminSideBar;