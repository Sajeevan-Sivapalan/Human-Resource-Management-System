import React from "react";
import {
  Button,
  Paper,
  Stack,
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

const CourseCard = (props) => {
  const { cid, type, cname, description, img } = props;

  const link =
    type === "user"
      ? `/learning/courses/${cid}`
      : `/learning/admin/courses/${cid}`;

  const handleClick = () => {
    window.open(`http://localhost:5173${link}`);
  };

  return (
    <Card
      sx={{
        minWidth: { xs: "100%", sm: "350px", md: "350px" },
        maxWidth: { xs: "100%", sm: "350px", md: "350px" },
      }}
    >
      <CardActionArea component={Link} onClick={handleClick}>
        <CardMedia
          component="img"
          image={img}
          sx={{
            width: "100%",
            height: 200,
          }}
        />

        <Typography
          variant="subtitle2"
          sx={{
            backgroundColor: "#42a5f5",
            width: "100%",
            color: "White",
            padding: "6px 8px",
            display: "block",
          }}
        >
          Created by HR Departmemt
        </Typography>

        <CardContent>
          <Typography
            pb={2}
            variant="h4"
            sx={{ fontSize: "1.2rem", fontWeight: 500, color: "#212121" }}
          >
            {cname}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ minHeight: "100px", maxHeight: "160px" }}
          >
            {description.slice(0, 119) + "..."}
          </Typography>
          <Stack direction="row" justifyContent="end">
            <ArrowForwardIcon color="primary" fontSize="medium" />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
