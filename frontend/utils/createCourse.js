import axios from "axios";

const createCourse = async (courseObj) => {
  const response = await axios.post(
    `http://localhost:8080/api/learn/course`,
    courseObj
  );
  return response;
};

export default createCourse;
