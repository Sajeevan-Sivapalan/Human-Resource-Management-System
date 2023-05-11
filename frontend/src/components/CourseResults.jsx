import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCourses from "../../utils/fetchCourses.js";
import React from "react";
import { CourseCard } from "./index.mjs";

const CourseResults = (props) => {
  const { type, search } = props;

  const { isLoading, data } = useQuery(["courses", search], fetchCourses, {
    onError: (error) => {
      console.log("error fetching courses", error);
    },
    onSuccess: (data) => {
      console.log("courses loaded succesfully", data);
    },
  });

  if (!data) {
    return <Typography>No Courseses Available</Typography>;
  }
  if (isLoading) {
    return <Typography>Loading</Typography>;
  }

  const courseList = data.map((course) => (
    <CourseCard
      type={type}
      key={course.cid}
      cid={course.cid}
      cname={course.cname}
      description={course.description}
      img={course.img}
    />
  ));

  return (
    <Stack
      direction="row"
      p={10}
      sx={{
        gap: { lg: "50px", md: "30px", xs: "30px" },
        backgroundColor: "#ffff",
      }}
      flexWrap="wrap"
      justifyContent="center"
    >
      {courseList}
    </Stack>
  );
};

export default CourseResults;
