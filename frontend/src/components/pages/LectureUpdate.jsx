import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Editor } from "../index.mjs";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AlertBox } from "../index.mjs";
import fetchModule from "../../../utils/fetchModule";
import updateModule from "../../../utils/updateModule.js";

const LectureUpdate = () => {
  const { cid, mid } = useParams();

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const [content, setContent] = useState({
    id: cid,
    mid: mid,
    page: {
      header: "",
      body: "",
    },
  });

  const { data, isLoading } = useQuery(["modules", mid], fetchModule, {
    onSuccess: (data) => {
      console.log("Module Successfully Load");
      setContent({
        id: cid,
        mid: mid,
        page: {
          header: data.header,
          body: data.body,
        },
      });
    },
    onError: (error) => {
      console.log(`Error Occured ${error}`);
    },
  });

  const mutation = useMutation(updateModule, {
    onError: (error) => {
      console.log("error updating Mmdule", error);
      setNotification({
        type: "error",
        message: "module creation failed",
      });
    },
    onSuccess: (data) => {
      console.log("module successfully updated", data);
      setNotification({
        type: "success",
        message: "module successfully updated",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await mutation.mutateAsync(content);
    } catch (error) {
      console.error("error updating module:", error);
    }
  };

  const handleContentChange = (data) => {
    if (typeof data === "string") {
      setContent((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          body: data,
        },
      }));
    } else {
      setContent((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          header: data.target.value,
        },
      }));
    }
  };

  console.log(content);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  //   console.log(content);

  return (
    <Box sx={{ backgroundColor: "#ffff", color: "black", marginTop: "100px" }}>
      <Box sx={{ marginBottom: "20px", padding: "0 10vw" }}>
        {notification.type && (
          <AlertBox type={notification.type} message={notification.message} />
        )}
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{ marginBottom: "20px", textAlign: "right", padding: "0 10vw" }}
        >
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </Box>
        <Editor handleContent={handleContentChange} content={content} />
      </form>
    </Box>
  );
};

export default LectureUpdate;
