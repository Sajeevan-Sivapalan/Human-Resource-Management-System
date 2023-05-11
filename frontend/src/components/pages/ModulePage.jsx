import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Drawer } from "@mui/material";

import { Content, ModuleSidebar } from "../index.mjs";
import fetchCourse from "../../../utils/fetchCourse";
import updateModuleProg from "../../../utils/updateModuleProg";
import fetchProgress from "../../../utils/fetchProgress";

const ModulePage = () => {
  const { id, lid } = useParams();
  const [data, setData] = useState({
    modules: [],
    completedModules: [],
    progress: 0,
  });

  const queryClient = useQueryClient();
  const [currentModuleIndex, setCurrentModuleIndex] = useState(parseInt(lid));

  const { mutateAsync } = useMutation(updateModuleProg, {
    onError: (error) => {
      console.log("error updating progress", error);
    },
    onSuccess: (data) => {
      console.log("progress successfully updated", data);
      queryClient.invalidateQueries([
        "details",
        id,
        localStorage.getItem("username"),
      ]);
    },
  });

  const { isLoading } = useQuery(
    ["details", id, localStorage.getItem("username")],
    fetchProgress,
    {
      onError: (error) => {
        console.log("error getting module", error);
      },
      onSuccess: (data) => {
        console.log(data);
        const { modules, completedModules, progress } = data;
        setData({
          modules,
          completedModules,
          progress,
        });
        console.log("module successfully updated", data);
      },
    }
  );

  const navigate = useNavigate();

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  const completed = data.completedModules;

  console.log(completed);

  const handleSelected = (lid) => {
    setCurrentModuleIndex(lid);
    navigate(`/learning/courses/${id}/module/${lid}`);
  };

  const handlePrevious = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex((prev) => prev - 1);
      navigate(`/learning/courses/${id}/module/${currentModuleIndex - 1}`);
    }
  };
  const handleNext = async () => {
    if (currentModuleIndex < data.modules.length - 1) {
      setCurrentModuleIndex((prev) => prev + 1);

      try {
        await mutateAsync({
          cid: id,
          mid: data.modules[currentModuleIndex]._id,
          username: localStorage.getItem("username"),
        });
      } catch (err) {
        console.error(err);
      }

      navigate(`/learning/courses/${id}/module/${currentModuleIndex + 1}`);
    }
  };

  const drawerWidth = 260;

  return (
    <Box sx={{ display: "flex", paddingTop: 6 }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <ModuleSidebar
          completed={completed}
          modules={data.modules}
          lid={lid}
          handleSelected={handleSelected}
        />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          color: "black",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Box backgroundColor="#ffff">
          <Content
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            mid={data.modules[currentModuleIndex]._id}
          />
          <Box pb={3} pl={4}>
            <Button
              sx={{ marginRight: "15px" }}
              onClick={handlePrevious}
              disabled={currentModuleIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentModuleIndex === data.modules.length - 1}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ModulePage;
