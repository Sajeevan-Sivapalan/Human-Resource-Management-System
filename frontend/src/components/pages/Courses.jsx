import React, { useState } from "react";
import { Box } from "@mui/material";
import { SearchBar, CourseResults } from "../index.mjs";
import { useMutation } from "@tanstack/react-query";
import createModule from "../../../utils/createModule";

const Courses = () => {
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const handleSearch = () => setSearch(query);

  const handleChange = (e) => {
    const { value } = e.target;

    if (!value) {
      return setSearch(undefined);
    } else {
      return setQuery(value);
    }
  };

  if (!query) {
    console.log("empty");
  }

  console.log(search);
  console.log(query);

  return (
    <Box>
      <SearchBar
        handleSearch={handleSearch}
        handleChange={handleChange}
        query={query}
      />
      <CourseResults search={search} type="user" />
    </Box>
  );
};

export default Courses;
