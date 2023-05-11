import axios from "axios";

const updateCourse = async (courseObj) => {
  const response = await axios.put(
    `http://localhost:8080/api/learn/course/${courseObj.cid}`,
    courseObj
  );
  return response.data;
};

export default updateCourse;
