import { useState } from "react";
import {
  TextField,
  Box,
  FormControl,
  Chip,
  Button,
  Typography,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
  Alert,
  Snackbar,
  FormHelperText,
} from "@mui/material";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import updateCourse from "../../utils/updateCourse";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

const CourseForm = (props) => {
  const { formData, id, username } = props;

  const queryClient = useQueryClient();
  const [notification, setNotification] = useState({
    status: false,
    severity: "",
    message: "",
  });

  const [data, setFields] = useState({
    ...formData,
  });

  console.log(data.required);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFields((prev) => {
      if (type === "checkbox") {
        const required = [...prev.required];

        if (checked) {
          required.push(name);
        } else {
          const index = required.indexOf(name);
          if (index !== -1) {
            required.splice(index, 1);
          }
        }
        return {
          ...prev,
          required,
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  const mutation = useMutation(updateCourse, {
    onError: (error) => {
      console.log("error updating course", error);
      setNotification({
        message: "Course Update Failed",
        severity: "error",
        status: true,
      });
    },
    onSuccess: (data) => {
      console.log("course successfully updated", data);
      setNotification({
        message: "Course Update Success",
        severity: "success",
        status: true,
      });

      queryClient.invalidateQueries(["details", id, "admin", username]);
      // queryClient.invalidateQueries(["details", id, "admin", username]);
    },
  });

  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Shift") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag !== "") {
        setTags([...tags, newTag]);
        e.target.value = "";
      }
    }
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await mutation.mutateAsync(data);
    } catch (error) {
      console.error("error updating module:", error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification((prev) => ({
      ...prev,
      status: false,
    }));
  };

  return (
    <Box noValidate autoComplete="off">
      <Snackbar
        open={notification.status}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          severity={notification.severity}
          sx={{ width: "100%" }}
          onClose={handleClose}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      <Typography
        variant="h4"
        sx={{
          fontSize: "2rem",
          color: "#1769aa",
          fontWeight: "500",
          marginBottom: "25px",
        }}
      >
        Update Course
      </Typography>
      <form onSubmit={updateSubmit}>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
            width: "800px",
          }}
        >
          <TextField
            name="cname"
            onChange={handleChange}
            required
            label="Course Name"
            error={data.cname === ""}
            helperText={data.cname === "" ? "Course name is required" : ""}
            value={data.cname}
          />

          <TextField
            name="description"
            required
            label="Description"
            onChange={handleChange}
            value={data.description}
            error={data.description === ""}
            helperText={data.description === "" ? "Provide a description" : ""}
            rows={6}
            multiline
          />

          <CloudinaryUploadWidget setFields={setFields} />

          {/* <Box>
            <TextField
              onKeyDown={handleKeyDown}
              label="Skills"
              placeholder="Enter Skills Separted By Shift Key"
              helperText="Incorrect entry."
              onChange={handleChange}
              fullWidth
            />
            <>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  style={{ margin: "10px 8px 10px 0" }}
                />
              ))}
            </>
          </Box> */}

          <Box>
            <FormLabel component="legend">
              Select Which Department Of Employees This Course For
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    checked={data.required.includes("HR")}
                    name="HR"
                  />
                }
                label="HR Departemnet"
                style={{ color: "black" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    checked={data.required.includes("IT")}
                    name="IT"
                  />
                }
                label="IT Support"
                style={{ color: "black" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleChange}
                    checked={data.required.includes("LAW")}
                    name="LAW"
                  />
                }
                label="LAW Department"
                style={{ color: "black" }}
              />
            </FormGroup>
            <FormHelperText error={data.required.length === 0}>
              {data.required.length === 0
                ? "Please select at least one department"
                : "Select one or more"}
            </FormHelperText>
          </Box>

          <TextField
            name="ETC"
            required
            label="Time To Complete"
            onChange={handleChange}
            sx={{ width: "200px" }}
            value={data.ETC}
            error={data.ETC === ""}
            helperText={
              data.ETC === "" ? "Provide a description" : "Strings only"
            }
          />
          <Button variant="contained" color="primary" type="submit">
            Update
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default CourseForm;
