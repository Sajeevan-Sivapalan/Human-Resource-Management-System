import React from "react";
import { Stack } from "@mui/system";
import { CourseInfoCard } from "./index.mjs";

const Ongoing = (props) => {
  const { content } = props;

  const ongoing = content.map((course) => (
    <CourseInfoCard
      key={course._id}
      completedCount={course.completedModules.length}
      moduleCount={course.courseId.modules.length + 1}
      cname={course.courseId.cname}
      img={course.courseId.img}
    />
  ));
  return <Stack gap={5}>{ongoing}</Stack>;
};

export default Ongoing;
