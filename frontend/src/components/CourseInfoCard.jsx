import React from "react";
import {
  Card,
  Box,
  CardMedia,
  CardContent,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import { Stack } from "@mui/system";

const CourseInfoCard = (props) => {
  const { cname, img, moduleCount, completedCount } = props;

  console.log(moduleCount);
  console.log(completedCount);
  const rate = Math.round(((completedCount + 1) / moduleCount) * 100);
  console.log(rate);
  return (
    <Card sx={{ display: "flex", width: "800px" }}>
      <CardMedia component="img" sx={{ width: 150 }} image={img} />
      <Box sx={{ width: "100%" }}>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>
              <Stack
                direction="column"
                justifyContent="space-between"
                sx={{ height: "100%" }}
              >
                <Typography
                  pb={2}
                  variant="h4"
                  sx={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: "#212121",
                    height: "70px",
                    overflow: "hidden",
                  }}
                >
                  {cname}
                </Typography>

                <Box>
                  <Typography>Complete</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={rate ? rate : 0}
                  />
                </Box>
              </Stack>
            </Box>

            <Box
              p={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack spacing={2}>
                {/* <Button variant="contained">Enroll</Button> */}
                <Button variant="contained">Continue</Button>
                <Button variant="contained">View Certificate</Button>
              </Stack>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CourseInfoCard;
