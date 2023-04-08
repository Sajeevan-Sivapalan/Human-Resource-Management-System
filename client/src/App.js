import AdminPanel from "./components/AdminComponents/AdminPanel";
import EmployeePanel from "./components/EmployeeComponents/EmployeePanel";
import { Route, Routes, Outlet } from "react-router-dom";
import AdminReqLeave from "./components/AdminComponents/AdminReqLeave";
import ExitQR from "./components/QRComponents/ExitQR";
import Attendance from "./components/AdminComponents/Attendance";
import EntranceQR from "./components/QRComponents/EntranceQR";
import EmployeeReqLeave from "./components/EmployeeComponents/EmployeeReqLeave";
import ViewDisplay from "./components/ViewComponent/ViewDisplay";

function App() {
  return (
    //<AdminPanel></AdminPanel>
    //<EmployeePanel></EmployeePanel> 
    <ViewDisplay></ViewDisplay>
  );
}

export default App;
