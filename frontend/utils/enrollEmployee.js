import axios from "axios";

const enrollEmployee = async (employeeObj) => {
  console.log(employeeObj);
  const response = await axios.post(
    `http://localhost:8080/api/learn/course/enroll`,
    employeeObj
  );
  return response;
};

export default enrollEmployee;
