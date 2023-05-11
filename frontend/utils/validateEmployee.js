import axios from "axios";

const validateEmployee = async (loginObj) => {
  const response = await axios.post(
    `http://localhost:8080/api/learn/employee/signin`,
    loginObj
  );
  console.log(response.data);
  return response.data;
};

export default validateEmployee;
