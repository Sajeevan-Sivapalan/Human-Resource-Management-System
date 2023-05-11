import axios from "axios";

const enrolledEmployee = async (employeeObj) => {
  console.log(employeeObj);
  const response = await axios.post(
    `http://localhost:8080/api/learn/module`,
    employeeObj
  );
  return response;
};

export default enrolledEmployee;
