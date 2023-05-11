import React, { useState, useEffect } from 'react'
import axios from "axios";
import EmployeeReqLeaveForm from "./EmployeeReqLeaveForm";
import EmployeeLeaveList from "./EmployeeLeaveList";
import useAuth from '../../hooks/useAuth';
import useTitle from '../../hooks/useTitle';

const EmployeeReqLeave = () => {
    useTitle("Employee Leave Request");

    const [empLeaveData, setEmpReqList] = useState([])
    const { username, status } = useAuth()

    //Retrieve all the resources
    const retrieveEmpReqList = () => {
        // get all Employee request leave record and sending to filterContent method
        axios.get(`http://localhost:5000/EmployeeReqLeave`).then(res => {
            setEmpReqList(res.data)
            filterContent(res.data, username);
        })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        retrieveEmpReqList()
    }, [])


    // filter data for employee id 
    const filterContent = (empLeaveData, searchEmp) => {
        const result = empLeaveData.filter((empLeaveData) => empLeaveData.username.includes(searchEmp));
        setEmpReqList(result)
    }

    // mapping to EmployeeLeaveList the record
    const getReqLeaveData = () => {
        return empLeaveData.map((res, index) => {
            return <EmployeeLeaveList obj={res} key={index} />
        }
        )
    }


    return (
        <>
            <EmployeeReqLeaveForm></EmployeeReqLeaveForm>
            <div class="leave-list">
                <div class="row justify-content-center">
                    {getReqLeaveData()}
                </div>
            </div>
        </>
    );

}

export default EmployeeReqLeave