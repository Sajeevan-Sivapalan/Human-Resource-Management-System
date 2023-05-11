import { useState } from "react";
import { resolvePath, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchCourse from "../../../utils/fetchCourse";
import deleteModule from "../../../utils/deleteModule";
import BarChart from "../BarChart";
import { CourseForm, DialogBox } from "../index.mjs";
import UserTable from "../userTable";
import {
  Box,
  Chip,
  Typography,
  Divider,
  CardActionArea,
  Card,
  Button,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SchoolIcon from "@mui/icons-material/School";
import { Stack } from "@mui/system";

const ManageCourse = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [form, setForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    success: false,
    title: "",
    message: "",
  });

  const username = localStorage.getItem("username");

  const { data, isLoading } = useQuery(
    ["details", id, "admin", username],
    fetchCourse,
    {
      onError: (error) => {
        console.log(`Error Occured ${error}`);
      },
      onSuccess: (data) => {
        console.log("Course Successfully Load");
      },
    }
  );

  const mutation = useMutation(deleteModule, {
    onSuccess: (data) => {
      setNotification((prev) => ({
        success: true,
        title: data.message,
        message: `Module is successfully deleted`,
      }));
      setOpen(true);
      queryClient.invalidateQueries(["details", id, "admin", username]);
    },
    onError: (error) => {
      setOpen(true);
      setNotification((prev) => ({
        ...prev,
        title: error.message,
        message: "Module deletion failed",
      }));
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleModuleDelete = async (cid, mid) => {
    const moduleObj = { cid, mid };
    try {
      console.log(cid, mid);
      const result = await mutation.mutateAsync(moduleObj);
    } catch (error) {
      console.error("error updating module:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const {
    _id,
    img,
    cid,
    cname,
    description,
    deptCounts,
    enrollers,
    skills,
    required,
    createdAt,
    updatedAt,
    modules,
    ETC,
  } = data;

  const lessons =
    modules &&
    modules.map((lesson, index) => {
      const { _id, header } = lesson;
      return (
        <Box
          key={_id}
          sx={{
            width: "250px",
            padding: "1rem",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
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
          <Box>
            <Typography variant="h6" sx={{ color: "#037ac4" }}>
              {`${header.slice(0, 22)}`}
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 0",
            }}
          >
            <SchoolIcon sx={{ color: "#038de2" }} />
            <Typography sx={{ color: "#1e1e1e" }} variant="subtitle2">
              {`lesson ${index + 1}`}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleUpdateModule(_id)}
              endIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              onClick={() => handleModuleDelete(id, _id)}
              size="small"
              endIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        </Box>
      );
    });

  const handleCreateModule = () => {
    window.open(`http://localhost:5173/learning/admin/course/${id}/editor`);
  };

  const handleUpdateModule = (mid) => {
    console.log(mid);
    window.open(
      `http://localhost:5173/learning/admin/course/${id}/module/${mid}/editor`
    );
  };

  return (
    <Box sx={{ backgroundColor: "#ffff" }}>
      <Box
        p={8}
        pt={12}
        pb={5}
        sx={{
          minHeight: "40vh",
          display: "flex",
          gap: "2rem",
          background: "rgb(3,122,196)",
          background:
            "linear-gradient(180deg, rgba(3,122,196,1) 25%, rgba(84,174,203,1) 88%)",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <img
            style={{
              maxWidth: "350px",
              maxHeight: "200px",
              boxShadow:
                "rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px",
            }}
            src={img}
          />

          <Box
            sx={{ marginTop: "auto", display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="subtitle2"
              sx={{ color: "#ffff", marginBottom: "4px" }}
            >
              Skill Tags
            </Typography>
            <Box>
              {skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  style={{
                    marginBottom: "10x",
                    marginRight: "8px",
                    fontWeight: 600,
                    color: "#343434",
                    backgroundColor: "#DBD7D2",
                    border: "1px solid #353839",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 4, color: "#ffff" }}>
          <Box
            sx={{
              display: "flex",
              height: "100%",
              flexDirection: "column",
              alignItems: "space-between",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontWeight: "600", fontSize: "2.5rem" }}
            >
              {`${cname}-(${cid})`}
            </Typography>

            <Typography
              sx={{ minHeight: "4rem", colro: "#cbcbcb", maxHeight: "4rem" }}
            >
              {description.slice(0, 200) + "..."}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: "30px",
                colorr: "#d1d1d1",
              }}
            >
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                No Of Modules: {modules.length}
              </Typography>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                Time To Complete: {ETC}
              </Typography>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
                Created At: {createdAt.slice(0, 10)}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Button
                sx={{ width: "180px" }}
                variant="contained"
                onClick={() => setForm((prev) => !prev)}
              >
                Update Course
              </Button>

              <Button variant="contained" sx={{ width: "100px" }}>
                Visit
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {form && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "4rem",
          }}
        >
          <CourseForm
            formData={{ cid, img, cname, description, ETC, skills, required }}
            id={id}
            username={username}
          />
        </Box>
      )}

      <Box sx={{ padding: "2rem 4rem", backgroundColor: "#f2f2f2" }}>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Card
            sx={{
              width: "300px",
              height: "200px",
              color: "#ffff",
              borderRadius: "0",
              background: "rgb(15,90,168)",
              background:
                "linear-gradient(127deg, rgba(15,90,168,1) 18%, rgba(3,146,196,1) 82%)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <CardActionArea
              sx={{
                width: "300px",
                height: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onClick={handleCreateModule}
            >
              <Typography sx={{ fontWeight: "500", fontSize: "1.5rem" }}>
                Create New Module
              </Typography>
              <Box>
                <AddCircleOutlineIcon size="large" />
              </Box>
            </CardActionArea>
          </Card>
          <Box
            sx={{
              flexGrow: 1,
              padding: "1.2rem",
              background: "rgb(10,108,131)",
              background:
                "linear-gradient(127deg, rgba(10,108,131,1) 32%, rgba(84,124,203,1) 93%)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-evenly",
              }}
            >
              <Typography
                sx={{ fontWeight: "500", color: "#ffff", fontSize: "1.5rem" }}
              >
                Insights
              </Typography>
              <Typography
                sx={{ fontSize: "1.8rem", fontWeight: "500", color: "#ffff" }}
              >
                {enrollers.length < 20 &&
                  `More enrollments can be expected in future`}
                {enrollers.length > 20 &&
                  `Employees are interested in this course`}
              </Typography>
              <Box sx={{ display: "flex", gap: "3rem" }}>
                <Typography
                  sx={{ fontWeight: "500", color: "#ffff", fontSize: "1.2rem" }}
                >
                  No Of Modules {modules.length}
                </Typography>
                <Typography
                  sx={{ fontWeight: "500", color: "#ffff", fontSize: "1.2rem" }}
                >
                  No Of Enrollments {enrollers.length}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ padding: "2rem", backgroundColor: "#f2f2f2" }}>
        <Typography
          mt={2}
          mb={5}
          sx={{
            color: "#595959",
            fontSize: "1.2rem",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Active Modules
        </Typography>
        {modules && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
                xl: "repeat(5, 1fr)",
              },
              alignItems: "center",
              justifyItems: "center",
              rowGap: "5px",
            }}
          >
            {lessons}
          </Box>
        )}
      </Box>

      <Box sx={{ backgroundColor: "#E8F5FE", paddingTop: "20px" }}>
        <Typography
          mt={2}
          mb={5}
          sx={{
            color: "#595959",
            fontSize: "1.2rem",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          No Of Enrollments According To Department
        </Typography>
        <BarChart data={deptCounts} />
      </Box>

      <Box sx={{ padding: "2rem" }}>
        <Typography
          mb={5}
          mt={2}
          sx={{
            color: "#595959",
            fontSize: "1.2rem",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Employee Course Completion
        </Typography>
        <UserTable users={enrollers} mCount={modules.length} cid={_id} />
      </Box>
    </Box>
  );
};

export default ManageCourse;
