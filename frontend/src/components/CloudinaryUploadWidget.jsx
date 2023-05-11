import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";

const CloudinaryUploadWidget = (props) => {
  const { setFields } = props;

  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [imagePublicId, setImagePublicId] = useState(null);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dpmszkaff",
        uploadPreset: "mklwjsd",
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          setImagePublicId(result.info.public_id);
          setFields((prev) => ({
            ...prev,
            img: `https://res.cloudinary.com/dpmszkaff/image/upload/${result.info.public_id}`,
          }));
        }
      }
    );
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Button
        variant="outlined"
        sx={{ textAlign: "left", width: "100px" }}
        onClick={() => widgetRef.current.open()}
      >
        Upload
      </Button>
      {imagePublicId && (
        <img
          width="350"
          src={`https://res.cloudinary.com/dpmszkaff/image/upload/${imagePublicId}`}
          alt="Uploaded Image"
        />
      )}
    </Box>
  );
};

export default CloudinaryUploadWidget;
