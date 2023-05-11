import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import validateEmployee from "../../../utils/validateEmployee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, TextField, Typography, Stack, Button } from "@mui/material";

const SignIn = () => {
  const [login, setLogin] = useState({
    role: "",
    username: "",
    password: "",
  });
  const [navigate, setNavigate] = useState(false);

  const { mutateAsync, data, isLoading } = useMutation(validateEmployee, {
    onSuccess: (data) => {
      setLogin({
        role: "",
        username: "",
        password: "",
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("firstName", data.user.firstName);
      localStorage.setItem("lastName", data.user.lastName);
      localStorage.setItem("role", data.user.role);

      // const toka = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      // console.log(toka);
      // console.log(username);

      setTimeout(() => {
        setNavigate(true);
      }, 3000);
    },
    onError: (err) => {
      console.log("");
    },
  });

  if (navigate) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await mutateAsync(login);
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  console.log(login);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#4dabf5",
          minHeight: "100vh",
        }}
      >
        <Box
          m={3}
          sx={{
            display: "flex",
            width: "40vw",
            gap: "10px",
            flexDirection: "column",
            justifyContent: "center",
            color: "#ffff",
          }}
        >
          <Typography variant="h2">Welcome Back</Typography>
          <Typography variant="h5" sx={{ fontWeight: "500" }}>
            Improve Your Knowledge For Better Future
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          flexGrow: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Stack gap={4} sx={{ width: "500px" }}>
            <Typography
              variant="h5"
              sx={{ color: "#4dabf5", textAlign: "center" }}
            >
              Sign In
            </Typography>
            <TextField
              name="username"
              value={login.username}
              onChange={handleChange}
              id="username"
              label="Username"
              type="text"
              required
            />
            <TextField
              name="password"
              value={login.password}
              onChange={handleChange}
              id="password"
              label="Password"
              type="password"
              required
            />
            <Button variant="contained" type="submit" size="large">
              Sign In
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SignIn;
