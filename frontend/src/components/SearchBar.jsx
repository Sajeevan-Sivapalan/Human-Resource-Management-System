import React from "react";
import { Box, InputBase, Paper, IconButton, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (props) => {
  const { handleChange, handleSearch } = props;

  return (
    <Box
      pl={2}
      pr={2}
      pt={15}
      pb={8}
      width="100%"
      sx={{
        display: "flex",
        justifyContent: "center",
        // backgroundColor: "#add8e6",
        backgroundColor: "#037ac4",
        width: "min-width",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "70%",
        }}
      >
        <InputBase
          name="search"
          onChange={handleChange}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for a course"
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleSearch}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;
