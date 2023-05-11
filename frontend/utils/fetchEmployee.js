import axios from "axios";

const fetchEmployee = async ({ queryKey }) => {
  const id = queryKey[1];

  const response = await axios.get(
    `http://localhost:8080/api/learn/employee/${id}`
  );
  console.log(response.data);
  return response.data;
};

export default fetchEmployee;
