import axios from "axios";

const createCourse = async (moduleObj) => {
  const response = await axios.post(
    `http://localhost:8080/api/learn/module`,
    moduleObj
  );
  return response;
};

export default createCourse;
