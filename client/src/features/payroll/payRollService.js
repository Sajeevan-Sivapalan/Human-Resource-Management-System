import axios from 'axios'

const API_URL = 'http://localhost:5000/api/payrolls/'

//Add Payroll

const createPayRoll = async (payRollData) => {
    const response = await axios.post(API_URL, payRollData)

    return response.data
}



const getPayRolls = async () => {
    const response = await axios.get(API_URL)

    return response.data
}

const deletePayRoll = async (payrollId) => {

    const response = await axios.delete(API_URL + payrollId)

    return response.data
}

const updatePayRoll = async (Id, updatedPayrollData) => {
    const response = await axios.put(API_URL + Id, updatedPayrollData);
    console.log('in service ',updatedPayrollData, "id ",Id )
    return response.data;
};

const updatePayRollfromUser = async (empID, updatedPayrollData) => {
    const response = await axios.put(API_URL +'updatefromUser/'+ empID, updatedPayrollData);
    console.log('in service ',updatedPayrollData, "id ",empID )
    return response.data;
};


const payRollService = {
    createPayRoll,
    getPayRolls,
    deletePayRoll,
    updatePayRoll,
    updatePayRollfromUser
}
export default payRollService