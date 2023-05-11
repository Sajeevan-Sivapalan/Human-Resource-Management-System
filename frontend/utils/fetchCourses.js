import axios from "axios";

const fetchCourses = async ({ queryKey }) => {
  const search = queryKey[1];

  const response = await axios.get(
    `http://localhost:8080/api/learn/course?search=${search}`
  );
  return response.data;
};

export default fetchCourses;
