import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import JoditEditor from "jodit-react";
import { useMutation } from "@tanstack/react-query";

const Editor = (props) => {
  const { content, handleContent } = props;

  //   const [header, setHeader] = useState();

  //   const handleChange = (e) => {
  //     setHeader(e.target.value);
  //   };

  //   console.log(header);

  console.log(content.page.header);
  return (
    <Box sx={{ margin: "0 10vw" }}>
      <Box sx={{ paddingBottom: "20px" }}>
        <TextField
          name="header"
          onChange={handleContent}
          value={content.page.header}
          required
          fullWidth
          label="Module Name"
        />
      </Box>
      <JoditEditor
        onChange={(newContent) => handleContent(newContent)}
        value={content.page.body}
      />
    </Box>
  );
};

export default Editor;
