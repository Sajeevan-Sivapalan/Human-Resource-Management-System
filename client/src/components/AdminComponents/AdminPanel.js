import React from "react";
import NavBar from "./NavBar";
import AdminSideBar from "./AdminSideBar";
import AdminContent from "./AdminContent";

function AdminPanel() {
    return(
        <>
            <NavBar></NavBar>
            <AdminSideBar></AdminSideBar>
            <AdminContent></AdminContent>            
        </>
    );
}

export default AdminPanel;