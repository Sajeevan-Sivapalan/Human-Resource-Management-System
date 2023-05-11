import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useNavigate } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { Resources, CreateNew, Learners, Status } from "../index.mjs";

const drawerWidth = 200;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Courses");
  const role = localStorage.getItem("role");
  console.log(role);

  const handleSelected = (text) => {
    setSelected(text);
  };

  if (role === "User") {
    return (
      <Typography variant="h1" sx={{ color: "#00000", margin: "100px" }}>
        You Are Not Allowed To Access This Page
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

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
        <Toolbar />
        <Divider />
        <List>
          {["Courses", "Create New", "Learners", "Status"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleSelected(text)}>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "#212121",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />

        {selected === "Courses" && <Resources />}
        {selected === "Create New" && <CreateNew />}
        {selected === "Learners" && <Learners />}
        {selected === "Status" && <Status />}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
