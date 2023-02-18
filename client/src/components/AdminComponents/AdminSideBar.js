import React from "react";
import {Link} from "react-router-dom";

function AdminSideBar() {
    return(
        <div class="nav flex-column nav-pills bg-light sidebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <Link class="nav-link" to="">Home</Link>
            <Link class="nav-link" to="">Profile</Link>
            <Link class="nav-link" to="/Attendance">Attendance</Link>
            <Link class="nav-link" to="/AdminReqLeave">Leave Request</Link>
            
        </div>
    );
}

export default AdminSideBar;