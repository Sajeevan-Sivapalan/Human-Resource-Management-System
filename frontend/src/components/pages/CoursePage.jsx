import React, { useState } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { DialogBox } from "../index.mjs";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";

import fetchCourse from "../../../utils/fetchCourse";
import enrollEmployee from "../../../utils/enrollEmployee";
import background from "../../assets/coursebg.jpg";

const CoursePage = () => {
  const { id } = useParams();
  const username = localStorage.getItem("username");

  const [enroll, setEnroll] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [notification, setNotification] = useState({
    success: false,
    title: "",
    message: "",
  });

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(enrollEmployee, {
    onSuccess: (data) => {
      setNotification((prev) => ({
        success: true,
        title: data.message,
        message: "Congratulation, You successfully enrolled to the course.",
      }));
      queryClient.invalidateQueries(["details", id, "employee", username]);
      setOpen(true);
    },
    onError: (error) => {
      setOpen(true);
      setNotification((prev) => ({
        ...prev,
        title: error.response.data.message,
        message:
          "Sorry!!. Looks like you are not allowed to enrolled this course. This happen when creators provide access only to choosen departments.",
      }));
      queryClient.invalidateQueries(["details", id, "employee", username]);
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handeEnrolled = async () => {
    try {
      const result = await mutateAsync({ username, cid: id });
    } catch (err) {
      console.error(err);
    }
  };

  const { data, isLoading } = useQuery(
    ["details", id, "employee", username],
    fetchCourse,
    {
      onSuccess: (data) => {
        console.log("course successfully load");
        setEnroll(data.isEnrolled);
      },
      onError: (error) => {
        console.log(`Error Occured ${error}`);
      },
    }
  );

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  const { cid, description, cname, skills, updatedAt, ETC, createdAt } = data;
  console.log(data);

  const skiilSet = skills.map((skill, index) => (
    <span
      key={index}
      style={{
        backgroundColor: "#eeeeee",
        fontSize: "1rem",
        fontWeight: "600",
        color: "#616161",
        padding: "5px 12px",
        marginRight: "10px",
        borderRadius: "100px",
      }}
    >
      {skill}
    </span>
  ));

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        height: "100vh",
        position: "relative",
        backgroundSize: "cover",
        overflow: "hidden",
      }}
    >
      {open && (
        <DialogBox
          open={open}
          handleClose={handleClose}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Box
        pl={10}
        pr={15}
        pt={10}
        pb={5}
        sx={{
          backgroundImage: "rgb(9,108,121)",
          color: "white",
          background:
            "linear-gradient(135deg, rgba(9,108,121,0.5375140765765766) 22%, rgba(23,105,170,0.9068834459459459) 85%)",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} sx={{ width: "80vw" }}>
          <Typography variant="h3" fontWeight="500">
            {cname} ({cid})
          </Typography>
          <Typography variant="body2">{`${description.slice(
            0,
            500
          )}...`}</Typography>
          <Stack
            pt={3}
            pb={3}
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Typography fontWeight="600" variant="h5">
              ETC {ETC}
              <QueryBuilderIcon />
            </Typography>
            <Typography fontWeight="600" variant="h5">
              Get Credited
              <WorkspacePremiumIcon />
            </Typography>
            <Typography fontWeight="600" variant="h5">
              No Enrolls +100
              <InsertEmoticonIcon />
            </Typography>
          </Stack>

          {!enroll && (
            <Button
              variant="contained"
              size="large"
              component={Link}
              onClick={handeEnrolled}
              sx={{ width: "200px" }}
            >
              Enroll
            </Button>
          )}
          {enroll && (
            <Button
              variant="contained"
              size="large"
              component={Link}
              onClick={handeEnrolled}
              to={`/learning/courses/${cid}/module/0`}
              sx={{ width: "200px" }}
            >
              Visit
            </Button>
          )}
          <Stack direction="row" pt={2}>
            {skiilSet}
          </Stack>
          <Stack direction="row" pb={10} spacing={15}>
            <Typography variant="subtitle1">
              Published In: {createdAt.split("T")[0]}
            </Typography>
            <Typography variant="subtitle1">
              Lsat Updated In: {updatedAt.split("T")[0]}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default CoursePage;
