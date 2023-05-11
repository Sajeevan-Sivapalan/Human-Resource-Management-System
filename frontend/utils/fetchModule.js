import axios from "axios";

const fetchModule = async ({ queryKey }) => {
  const id = queryKey[1];

  try {
    const response = await axios.get(
      `http://localhost:8080/api/learn/module/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export default fetchModule;
