import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DoughnutChart from "./DoughnutChart";
import { Box, Button } from "@mui/material";

const userTable = (props) => {
  const { users, mCount, cid } = props;
  console.log(mCount);
  const [status, setStatus] = useState({
    left: mCount,
    complete: 0,
    width: 0,
  });

  const [display, setDisplay] = useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "completed", headerName: "completed", width: 50 },
    {
      field: "button",
      headerName: "Button",
      width: 80,
      renderCell: (params) => (
        <Button onClick={() => handleClick(params.row.completed)}>Check</Button>
      ),
    },
  ];

  const handleClick = (count) => {
    setDisplay(true);
    setStatus(() => {
      const left = mCount - count;

      return {
        left,
        complete: count,
      };
    });
  };

  const rows = users.map((user, index) => {
    // console.log(user.enrolled);
    const course = user.enrolled.find((course) => course.courseId === cid);
    return {
      id: index + 1,
      username: user.username,
      fullName: `${user.firstName} ${user.lastName}`,
      completed: course.progress,
    };
  });

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "50vw" }}>
        {display && <DoughnutChart status={status} />}
      </Box>
      <Box sx={{ height: 300, maxWidth: "50vw" }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default userTable;
