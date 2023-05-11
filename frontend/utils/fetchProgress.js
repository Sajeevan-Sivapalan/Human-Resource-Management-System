import axios from "axios";

const fetchProgress = async ({ queryKey }) => {
  const cid = queryKey[1];
  const username = queryKey[2];

  try {
    const response = await axios.get(
      `http://localhost:8080/api/learn/module/progress/${cid}/${username}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export default fetchProgress;
