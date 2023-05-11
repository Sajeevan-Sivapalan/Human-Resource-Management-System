import React from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import fetchModule from "../../utils/fetchModule";

const Content = (props) => {
  const { mid, handlePrevious, handleNext } = props;

  const { isLoading, data } = useQuery(["modules", mid], fetchModule, {
    onSuccess: (data) => {
      console.log("Module Successfully Load");
    },
    onError: (error) => {
      console.log(`Error Occured ${error}`);
    },
  });

  if (isLoading) {
    return (
      <Typography
        variant="button"
        p={4}
        display="block"
        sx={{
          textAlign: "center",
        }}
        gutterBottom
      >
        Loading
      </Typography>
    );
  }

  const { header, body } = data;

  return (
    <>
      <Divider />
      <Typography variant="h3" color="primary" p={1} pl={4}>
        {header}
      </Typography>
      <Divider />
      <Box p={1} pl={4} pr={4}>
        <Box
          sx={{ fontFamily: "Roboto" }}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </Box>
    </>
  );
};

export default Content;
