import React from "react";
import NavBar from "../AdminComponents/NavBar";
import EmployeeSideBar from "./EmployeeSideBar";
import EmployeeContent from "./EmployeeContent";

function EmployeePanel() {
    return(
        <>
            <NavBar></NavBar>
            <EmployeeSideBar></EmployeeSideBar>
            <EmployeeContent></EmployeeContent>            
        </>
    );
}

export default EmployeePanel;