import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarCheck, FaFileAlt, FaMoneyBillAlt, FaFileInvoiceDollar, FaBook, FaSearch, FaCar, FaMap, FaCreditCard, FaBriefcase, FaFile } from "react-icons/fa";

function AdminSideBar() {
    return (
        <div class="nav flex-column nav-pills bg-primary sidebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <Link class="nav-link" to="/dash/admin/users">
                <FaUser class="sidebar-icon" />
                Employees
            </Link>
            <Link class="nav-link" to="/dash/admin/Attendance">
                <FaCalendarCheck class="sidebar-icon" />
                Attendance
            </Link>
            <Link class="nav-link" to="/dash/admin/AdminReqLeave">
                <FaFileAlt class="sidebar-icon" />
                Leave Request
            </Link>
            <Link class="nav-link" to="/dash/admin/AllPayRolls">
                <FaMoneyBillAlt class="sidebar-icon" />
                PayRolls
            </Link>
            <Link class="nav-link" to="/dash/admin/AllPaySlips">
                <FaFileInvoiceDollar class="sidebar-icon" />
                Payslips
            </Link>
            <Link class="nav-link" to="/dash/admin/resourcesList">
                <FaBook class="sidebar-icon" />
                Resources
            </Link>
            <Link class="nav-link" to="/dash/admin/resume/search">
                <FaFile class="sidebar-icon" />
                Resume
            </Link>
            <Link class="nav-link" to="/dash/admin/vacancy/search">
                <FaBriefcase class="sidebar-icon" />
                Vacancy
            </Link>
            <Link class="nav-link" to="/dash/admin/VehicleList">
                <FaCar class="sidebar-icon" />
                Vehicle
            </Link>
            <Link class="nav-link" to="/dash/admin/RouteList">
                <FaMap class="sidebar-icon" />
                Route
            </Link>
            <Link class="nav-link" to="/dash/admin/TransportPaymentList">
                <FaCreditCard class="sidebar-icon" />
                Transport Pay
            </Link>
            <Link class="nav-link" to="/dash/emp">
                <FaBook class="sidebar-icon" />
                Employee Dash
            </Link>           
        </div>
    );
}

export default AdminSideBar;