import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarCheck, FaFileAlt, FaMoneyBillAlt, FaFileInvoiceDollar, FaBook, FaSearch, FaCar, FaMap, FaCreditCard, FaBriefcase, FaFile } from "react-icons/fa";
import AddApplyTransport from "../Transport/AddApplyTransport";

function EmployeeSideBar() {
    return (
        <div class="nav flex-column nav-pills bg-primary sidebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <Link class="nav-link" to="/dash/emp/EmployeeAddTransport">
                <FaCar class="sidebar-icon" />
                Transport
            </Link>
            <Link class="nav-link" to="/dash/emp/EmployeeReqLeave">
                <FaFileAlt class="sidebar-icon" />
                Request Leave
            </Link>
            <Link class="nav-link" to="/dash/emp/EmployeeViewPayroll">
                <FaMoneyBillAlt class="sidebar-icon" />
                Payroll
            </Link>
            <button class="nav-link" onClick={()=>window.location.href='http://localhost:5173/'}>
                <FaMoneyBillAlt class="sidebar-icon" />
                LMS
            </button>
        </div>
    );
}

export default EmployeeSideBar;