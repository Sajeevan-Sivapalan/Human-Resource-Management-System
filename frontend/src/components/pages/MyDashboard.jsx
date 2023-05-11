import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Link,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import fetchEmployee from "../../../utils/fetchEmployee";
import { Ongoing, Required, Completed, Stats } from "../index.mjs";
import { useParams, useNavigate } from "react-router-dom";

const username = localStorage.getItem("username");
const firstName = localStorage.getItem("firstName");
const lastName = localStorage.getItem("lastName");

const MyDashboard = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(type);

  const { isLoading, data } = useQuery(["inside", username], fetchEmployee, {
    onError: (error) => {
      console.log("error fetching courses", error);
    },
  });

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  const { enrolled } = data;

  const handlePage = (page) => {
    console.log(page);
    setPage(page);
    navigate(`/learning/dashboard/${page}`);
  };

  return (
    <Box backgroundColor="#FFFF">
      <Box
        p={8}
        sx={{
          height: "40vh",
          backgroundColor: "#add8e6",
        }}
      >
        <Box>
          <Typography
            sx={{ color: "#ffff" }}
            variant="h4"
            pt={2}
            fontWeight={500}
          >
            Great To See You Back
          </Typography>
          <Typography
            sx={{ color: "#ffff" }}
            variant="h4"
            pb={2}
            fontWeight={500}
          >
            {firstName} {lastName}
          </Typography>
        </Box>

        <Stack display="column">
          <Box p={2} sx={{ backgroundColor: "#FFFF", width: "400px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography color="primary">Set Up A Career Goal</Typography>
              <img
                style={{ width: "48px", height: "48px", borderRadius: "100%" }}
                src="https://th.bing.com/th/id/R.228526ca3adfe15697b9dca256abf65b?rik=KUNVTJNPhgRWxQ&pid=ImgRaw&r=0"
              />
            </Box>

            <TextField
              fullWidth
              margin="none"
              label="I want to be a"
              variant="standard"
            />
            <Box
              pt={3}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Link>change account password</Link>
              <Button onClick={() => localStorage.removeItem("username")}>
                Log out
              </Button>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Box>
        <Divider />
        <ListItem>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              gap: "20px",
              width: "100%",
            }}
          >
            <ListItemButton onClick={() => handlePage("ongoing")}>
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#212121",
                  textAlign: "center",
                }}
                primary="On Going"
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                onClick={() => handlePage("required")}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#212121",
                  textAlign: "center",
                }}
                primary="Required"
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                onClick={() => handlePage("completed")}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#212121",
                  textAlign: "center",
                }}
                primary="Completed"
              />
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                onClick={() => handlePage("stats")}
                primaryTypographyProps={{
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  color: "#212121",
                  textAlign: "center",
                }}
                primary="Stats"
              />
            </ListItemButton>
          </Box>
        </ListItem>
        <Divider />

        <Box p={10}>
          {console.log(page == "ongoing")}
          {page == "ongoing" && <Ongoing content={enrolled} />}
          {page == "required" && <Required />}
          {page == "completed" && <Completed />}
          {page == "stats" && <Stats />}
        </Box>
      </Box>
    </Box>
  );
};

export default MyDashboard;
