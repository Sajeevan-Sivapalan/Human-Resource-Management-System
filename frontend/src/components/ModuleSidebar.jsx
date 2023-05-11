import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Toolbar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ModuleSidebar = (props) => {
  const { modules, completed, handleSelected, lid } = props;

  const completeSet = new Set(completed);
  // console.log(currentModuleIndex, lid) lid is string

  const moduleList = modules.map((module, index) => {
    const isComplete = completeSet.has(module._id);
    return (
      <ListItem key={module._id} disablePadding>
        <ListItemButton
          onClick={() => {
            handleSelected(index);
          }}
          selected={lid == index}
        >
          <ListItemIcon sx={{ marginRight: "0" }}>
            {isComplete ? (
              <CheckCircleIcon color="primary" />
            ) : (
              <CheckCircleOutlineIcon color="primary" />
            )}
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              fontSize: "0.9rem",
              fontWeight: "500",
              color: "#212121",
            }}
            primary={module.header}
          />
        </ListItemButton>
      </ListItem>
    );
  });

  // const handleComplete = (index) => {
  //   setComplete((prev) => {
  //     const arr = [...prev];
  //     arr[index] = !arr[index];
  //     return arr;
  //   });
  // };

  const drawerWidth = 260;

  return (
    <>
      <Toolbar />
      <Divider />
      <Typography
        variant="h6"
        p={1}
        pl={2}
        sx={{
          fontSize: "1rem",
          fontWeight: "500",
          color: "#61616",
          backgroundColor: "",
        }}
      >
        Lessons
      </Typography>
      <Divider />
      <List>{moduleList}</List>
    </>
  );
};

export default ModuleSidebar;
