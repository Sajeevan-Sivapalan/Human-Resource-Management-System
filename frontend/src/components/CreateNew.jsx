import { useState } from "react";
import {
  Box,
  FormControl,
  TextField,
  MenuItem,
  Typography,
  Chip,
  FormGroup,
  FormLabel,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Button,
  filledInputClasses,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AlertBox } from "./index.mjs";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import createCourse from "../../utils/createCourse";

const types = [
  { value: "GE", label: "GE" },
  { value: "IT", label: "IT" },
  { value: "HR", label: "HR" },
  { value: "PD", label: "PD" },
  { value: "AC", label: "AC" },
];

const dept = [
  { value: "GE", label: "GE" },
  { value: "HR", label: "HR Dept" },
  { value: "LAW", label: "LAW Dept" },
  { value: "AC", label: "AC" },
];

const CreateNew = () => {
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });
  const [tags, setTags] = useState([]);

  const setDemo = () => {
    const randomNid = Math.floor(Math.random() * 9000) + 1000;
    setFields((prev) => ({
      ...prev,
      cname: "How to Achieve Goals Through Personal Development",
      category: "GE",
      nid: randomNid,
      ETC: "1 week",
      requireTo: [],
      description:
        "In addition to the topics mentioned above, the course will also explore the role of mindset in sachieving goals. Students will learn about the difference between a fixed and a growth mindset, and how adopting a growth mindset can help them overcome challenges and achieve their goals. The course will also cover techniques for managing stress and maintaining a positive outlook, even in the face of setbacks. Throughout the course, students will have the opportunity to apply what they have learned to their own lives, setting goals and developing plans to achieve them. By the end of the course, students will have gained valuable insights into their own personal development journey and will be well on their way to achieving their goals.Received message. In addition to the topics mentioned above, the course will also explore the role of mindset in achieving goals. Students will learn about the difference between a fixed and a growth mindset, and how adopting a growth mindset can help them overcome challenges and achieve their goals. The course will also cover techniques for managing stress and maintaining a positive outlook, even in the face of setbacks. Throughout the course, students will have the opportunity to apply what they have learned to their own lives, setting goals and developing plans to achieve them. By the end of the course, students will have gained valuable insights into their own personal development journey and will be well on their way to achieving their goals",
      skills: [],
    }));
  };

  const [fields, setFields] = useState({
    cname: "",
    category: "GE",
    img: "",
    nid: "",
    ETC: "",
    requireTo: [],
    description: "",
    skills: [],
  });

  const mutation = useMutation(createCourse, {
    onError: (error) => {
      console.log("Error Creating Course", error);
      setNotification({
        type: "error",
        message:
          "combination course id already exist course creation failed!!!",
      });
    },
    onSuccess: (data) => {
      console.log("Course Created Successfully", data);
      setNotification({
        type: "success",
        message: "course created successfully",
      });
      setFields({
        nid: "",
        category: "",
        img: "",
        cname: "",
        ETC: "",
        requireTo: [],
        description: "",
        skills: [],
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await mutation.mutateAsync(fields);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Shift") {
      e.preventDefault();
      const newTag = e.target.value.trim();
      if (newTag !== "") {
        setTags([...tags, newTag]);
        e.target.value = "";
      }
    }

    setFields((prev) => ({
      ...prev,
      skills: [...tags],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFields((prev) => {
        const requireTo = [...prev.requireTo];

        if (checked) {
          requireTo.push(name);
        } else {
          const index = requireTo.indexOf(name);
          if (index !== -1) {
            requireTo.splice(index, 1);
          }
        }

        return {
          ...prev,
          requireTo,
        };
      });
    } else {
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Box>
      {notification.type && (
        <AlertBox type={notification.type} message={notification.message} />
      )}
      <Typography
        variant="h4"
        sx={{
          fontSize: "2rem",
          color: "#1769aa",
          fontWeight: "500",
          marginBottom: "25px",
        }}
      >
        Create New Course
      </Typography>
      <form onSubmit={handleSubmit}>
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
            required
            label="Course Name"
            onChange={handleChange}
            value={fields.cname}
            error={fields.cname === ""}
            helperText={fields.cname === "" ? "Course Name is required" : ""}
          />
          <Box>
            <TextField
              id="outlined-select-category"
              select
              error={fields.category === ""}
              name="category"
              value={fields.category}
              defaultValue="GE"
              sx={{ width: "200px" }}
              label="Course Category"
              onChange={handleChange}
              helperText="select course category"
            >
              {types.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              name="nid"
              required
              sx={{ marginLeft: "15px" }}
              onChange={handleChange}
              error={fields.nid === ""}
              label="Course ID"
              value={fields.nid}
              helperText={
                fields.nid === "" ? "Course ID is required" : "numbers only"
              }
            />
          </Box>

          <TextField
            name="description"
            onChange={handleChange}
            value={fields.description}
            required
            label="Description"
            error={fields.description === ""}
            rows={6}
            multiline
          />

          <Box>
            <TextField
              onKeyDown={handleKeyDown}
              label="Skills"
              placeholder="Enter Skills Separted By Shift Key"
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
          </Box>

          <CloudinaryUploadWidget setFields={setFields} />

          <Box>
            <FormLabel component="legend">
              Select Which Department Of Employees This Course For
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={handleChange} name="HR" />}
                label="HR Departemnet"
                style={{ color: "black" }}
              />
              <FormControlLabel
                control={<Checkbox onChange={handleChange} name="IT" />}
                label="IT Support"
                style={{ color: "black" }}
              />
              <FormControlLabel
                control={<Checkbox onChange={handleChange} name="LAW" />}
                label="LAW Department"
                style={{ color: "black" }}
              />
            </FormGroup>

            <FormHelperText error={fields.requireTo.length === 0}>
              {fields.requireTo.length === 0
                ? "Please select at least one department"
                : "Select one or more"}
            </FormHelperText>
          </Box>

          <TextField
            name="ETC"
            onChange={handleChange}
            value={fields.ETC}
            required
            error={fields.ETC === ""}
            helperText={
              fields.ETC === "" ? "Course ID is required" : "string only"
            }
            label="Time To Complete"
            sx={{ width: "200px" }}
          />

          <Button variant="contained" color="error" onClick={setDemo}>
            Demo
          </Button>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default CreateNew;
