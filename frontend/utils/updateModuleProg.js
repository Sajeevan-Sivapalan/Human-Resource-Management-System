import axios from "axios";

const updateModuleProg = async (moduleObj) => {
  console.log(moduleObj);
  const response = await axios.put(
    `http://localhost:8080/api/learn/module/${moduleObj.mid}/progress`,
    moduleObj
  );
  console.log(response.data);
  return response.data;
};

export default updateModuleProg;
