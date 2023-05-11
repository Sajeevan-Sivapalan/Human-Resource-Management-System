import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Editor } from "../index.mjs";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AlertBox } from "../index.mjs";
import createModule from "../../../utils/createModule";

const modules = [
  {
    header: "Introduction To Course",
    body: `<p style="font-size:20px; font-weight:bold; text-align:center;">Welcome to our exciting new course on "Exploring the Wonders of the Universe"!</p>
    <p style="font-size:16px; text-align:justify;">Throughout this journey, we will delve into the mysteries and complexities of the cosmos, from the smallest subatomic particles to the vast expanses of space. Get ready to expand your mind and discover the beauty of the universe through captivating lectures, interactive discussions, and hands-on activities.</p><iframe width="962px" height="560px" src="https://www.youtube.com/embed/lHX_56RWtSw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen=""></iframe>
    <p style="font-size:16px; text-align:justify;">Whether you're a seasoned astronomer or simply curious about the cosmos, this course will challenge and inspire you. So buckle up, and let's blast off into the unknown together!</p>
    <p style="font-size:16px; text-align:justify;"><br></p>`,
  },

  {
    header: "How To Achieve",
    body: `<p style="font-size:20px; font-weight:bold; text-align:center;">Why Understanding the Importance of Emotional Intelligence is Crucial in Today's World</p>
    <p><img src="https://www.voicesofyouth.org/sites/voy/files/images/2020-07/success.jpg" alt="" width="962" height="642">
    </p>
    <p style="font-size:16px; text-align:justify;">Emotional intelligence, or EQ, is the ability to understand, manage, and express emotions effectively. In today's fast-paced and ever-changing world, EQ has become increasingly important for success in both personal and professional settings. </p>
    <p style="font-size:16px; text-align:justify;">Research has shown that individuals with high levels of EQ are more likely to have successful relationships, manage stress more effectively, and be effective leaders. EQ is also closely tied to mental and physical health, with studies showing that those with higher EQ have better overall well-being.</p>
    <p style="font-size:16px; text-align:justify;">In today's interconnected world, EQ is especially crucial as we interact with people from diverse backgrounds and cultures. Understanding and managing our own emotions, as well as recognizing and responding to the emotions of others, can help us navigate complex social situations and build strong, meaningful relationships.</p>
    <p style="font-size:16px; text-align:justify;">In short, understanding the importance of emotional intelligence is crucial in today's world for personal and professional success, as well as overall well-being and positive social interactions.</p>
    <p>
    Regenerate response
    </p>`,
  },
  {
    header: "The End",
    body: `<p style="font-size:20px; font-weight:bold; text-align:center;">Why Understanding the Importance of Emotional Intelligence is Crucial in Today's World</p>
    <p style="font-size:16px; text-align:justify;">Emotional intelligence, or EQ, is the ability to understand, manage, and express emotions effectively. In today's fast-paced and ever-changing world, EQ has become increasingly important for success in both personal and professional settings. </p>
    <p style="font-size:16px; text-align:justify;">Research has shown that individuals with high levels of EQ are more likely to have successful relationships, manage stress more effectively, and be effective leaders. EQ is also closely tied to mental and physical health, with studies showing that those with higher EQ have better overall well-being.</p>
    <p style="font-size:16px; text-align:justify;">In today's interconnected world, EQ is especially crucial as we interact with people from diverse backgrounds and cultures. Understanding and managing our own emotions, as well as recognizing and responding to the emotions of others, can help us navigate complex social situations and build strong, meaningful relationships.</p>
    <p style="font-size:16px; text-align:justify;">In short, understanding the importance of emotional intelligence is crucial in today's world for personal and professional success, as well as overall well-being and positive social interactions.</p>
    `,
  },
  {
    header: "Why Leadership is important",
    body: `<p><strong><em>Why Leadership is important?</em></strong> Effective leadership is critical to the success of any organization or group. Leaders inspire, motivate, and guide their team members to achieve their goals and objectives. They set the vision and direction for the group, and then work to make that vision a reality. Good leaders also lead by example, demonstrating the values and behaviors they want to see in others.</p>`,
  },
];

const LectureCreate = () => {
  const { cid } = useParams();

  const [content, setContent] = useState({
    id: cid,
    page: {
      header: "",
      body: "",
    },
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const mutation = useMutation(createModule, {
    onError: (error) => {
      console.log("Error Creating Module", error);
      setNotification({
        type: "error",
        message: "module creation failed",
      });
    },
    onSuccess: (data) => {
      console.log("Course Created Successfully", data);
      setNotification({
        type: "success",
        message: "module successfully created",
      });

      setContent({
        id: cid,
        page: {
          header: "",
          body: "",
        },
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await mutation.mutateAsync(content);
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const handleSetDemo = () => {
    const random = Math.floor(Math.random() * 4);

    setContent((prev) => ({
      ...prev,
      page: {
        ...modules[random],
      },
    }));
  };

  const handleContentChange = (data) => {
    if (typeof data === "string") {
      setContent((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          body: data,
        },
      }));
    } else {
      setContent((prev) => ({
        ...prev,
        page: {
          ...prev.page,
          header: data.target.value,
        },
      }));
    }
  };

  console.log(content);

  return (
    <Box sx={{ backgroundColor: "#ffff", color: "black", marginTop: "100px" }}>
      <Box sx={{ marginBottom: "20px", padding: "0 10vw" }}>
        {notification.type && (
          <AlertBox type={notification.type} message={notification.message} />
        )}
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{ marginBottom: "20px", textAlign: "right", padding: "0 10vw" }}
        >
          <Button
            sx={{ marginRight: "10px" }}
            variant="contained"
            color="error"
            onClick={handleSetDemo}
          >
            Demo
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
        <Editor handleContent={handleContentChange} content={content} />
      </form>
    </Box>
  );
};

export default LectureCreate;
