import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminReqLeave from "./AdminReqLeave";
import Attendance from "./Attendance";
import AllPayrolls from "../AllPayrolls";
import AllPaySlips from "../AllPaySlips";
import UpdatePayroll from "../UpdatePayroll";
import IndividualPayroll from "../IndividualPayroll";
import AddPayRoll from "../AddPayRoll";
import ResourcesList from "../resource/ResourcesList";
import AddResource from "../resource/AddResource";
import AssignEmployee from "../resource/AssignEmployee";
import EditResource from "../resource/EditResource";
import ResourceDetails from "../resource/ResourceDetails";
import UsersList from "../../features/users/UsersList";
import ResumeList from "../../features/resume/ResumeList";
import EditResume from "../../features/resume/EditResume";
import NewResumeForm from "../../features/resume/NewResumeForm";
import VacancyList from "../../features/vacancy/VacancyList";
import EditVacancy from "../../features/vacancy/EditVacancy";
import NewVacancyForm from "../../features/vacancy/NewVacancyForm";
import ResumeSearch from "../../features/resume/ResumeSearch";
import VacancySearch from "../../features/vacancy/VacancySearch";
import Reporting from "../../features/resume/Reporting";
import EditUser from "../../features/users/EditUser";
import VehicleList from "../Transport/VehicleList";
import UpdateVehicle from "../Transport/UpdateVehicle";
import RouteList from "../Transport/RouteList";
import UpdateRoute from "../Transport/UpdateRoute";
import UpdateTransportPayment from "../Transport/UpdateTransportPayment";
import TransportPaymentList from "../Transport/TransportPaymentList";

function AdminContent() {
    return (
        <div class="content">
            <Routes>
                <Route>
                    <Route path="/AdminReqLeave" element={<AdminReqLeave />} />
                    <Route path="/Attendance" element={<Attendance />} />
                    <Route path='/AllPayrolls' element={<AllPayrolls />} />
                    <Route path='/AllPaySlips' element={<AllPaySlips />} />
                    <Route path='UpdatePayroll/:id' element={<UpdatePayroll />} />
                    <Route path='IndividualPayroll/:id' element={<IndividualPayroll />} />
                    <Route path='AddPayRoll' element={<AddPayRoll />} />
                    <Route path='resourcesList' element={<ResourcesList />} />
                    <Route path='addResource' element={<AddResource />} />
                    <Route path='assignEmployee/:id' element={<AssignEmployee />} />
                    <Route path='editResource/:id' element={<EditResource />} />
                    <Route path='resource/:id' element={<ResourceDetails />} />
                    <Route path='users' element={<UsersList />} />
                    <Route path='users/:id' element={<EditUser />} />

                    <Route path="resume">
                        <Route index element={<ResumeList />} />
                        <Route path=":id" element={<EditResume />} />
                        <Route path="new" element={<NewResumeForm />} />
                        <Route path="search" element={<ResumeSearch />} />
                        <Route path="reporting" element={<Reporting />} />

                    </Route>

                    <Route path="vacancy">
                        <Route index element={<VacancyList />} />
                        <Route path=":id" element={<EditVacancy />} />
                        <Route path="new" element={<NewVacancyForm />} />
                        <Route path="search" element={<VacancySearch />} />
                    </Route>

                    <Route path='VehicleList' element={<VehicleList />} />
                    <Route path='UpdateVehicle/:id' element={<UpdateVehicle />} />
                    <Route path='RouteList' element={<RouteList />} />
                    <Route path='UpdateRoute/:id' element={<UpdateRoute />} />
                    <Route path='UpdateTransportPayment/:id' element={<UpdateTransportPayment />} />
                    <Route path='TransportPaymentList' element={<TransportPaymentList />} />
                </Route>
            </Routes>
        </div>
    );
}

export default AdminContent;