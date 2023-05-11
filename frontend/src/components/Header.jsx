import React from "react";
import { Box, Stack, Typography, Button, AppBar } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar
      component="nav"
      position="fixed"
      sx={{ backgroundColor: "#1769aa" }}
      style={{ zIndex: 1201 }}
    >
      <Stack
        direction="row"
        alignItems="end"
        pl={2}
        pr={2}
        mt={1}
        mb={1}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "1.8rem" }}>
          mars co
        </Typography>

        <div>
          <Button
            variant="text"
            size="large"
            component={Link}
            sx={{
              color: "#fff",
              borderRadius: "0.1rem",
            }}
            to="/learning/courses"
          >
            Courses
          </Button>
          <Button
            variant="text"
            size="large"
            component={Link}
            sx={{
              color: "#fff",
              borderRadius: "0.1rem",
            }}
            to="/learning/admin"
          >
            Admin
          </Button>
          <Button
            variant="text"
            size="large"
            component={Link}
            sx={{
              color: "#fff",
              borderRadius: "0.1rem",
            }}
            to="/learning/dashboard/ongoing"
          >
            My Dahshboard
          </Button>
        </div>
      </Stack>
    </AppBar>
  );
};

export default Header;
// import React from "react";

// const Header = () => {

// };

// export default Header;
