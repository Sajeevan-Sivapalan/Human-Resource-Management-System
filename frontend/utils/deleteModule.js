import axios from "axios";

const deleteModule = async (moduleObj) => {
  const response = await axios.delete(
    `http://localhost:8080/api/learn/module/${moduleObj.mid}`,
    { data: moduleObj }
  );
  console.log(response.data);
  return response.data;
};

export default deleteModule;
