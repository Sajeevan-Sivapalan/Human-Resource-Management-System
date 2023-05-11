import axios from "axios";

const updateModule = async (moduleObj) => {
  const response = await axios.put(
    `http://localhost:8080/api/learn/module/${moduleObj.mid}`,
    moduleObj
  );
  console.log(response.data);
  return response.data;
};

export default updateModule;
