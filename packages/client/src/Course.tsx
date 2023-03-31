import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import "./App.css";

function Topic() {
  const [topic, setTopic] = useState("");
  const { courseName } = useParams();
  const reviewables = useLoaderData();

  // to do move this react router action
  const handleSubmission = async () => {
    const submissionUrl = `http://localhost:5174/api/topic/${courseName}`;
    const data = { topic };
    await axios.post(submissionUrl, data);
    setTopic("");
  };

  const handleReviewed = async (id: string) => {
    const reviewedUrl = `http://localhost:5174/api/reviewables/${courseName}/${id}`;
    await axios.patch(reviewedUrl);
    setTopic("");
  };

  let reviewableComponent: any[] = [];
  if (Array.isArray(reviewables)) {
    reviewableComponent = reviewables.map((reviewable) => {
      const { topic, id } = reviewable;
      return (
        <ListItem>
          <ListItemText primary={topic} />
          <Button onClick={async () => await handleReviewed(id)}>Done</Button>
        </ListItem>
      );
    });
  }

  return (
    <div>
      <TextField
        onChange={(e) => {
          setTopic(e.currentTarget.value);
        }}
        label="Topic Learned:"
        variant="outlined"
        value={topic}
      />
      <Button
        sx={{ marginLeft: "10px" }}
        variant="contained"
        onClick={handleSubmission}
      >
        Submit
      </Button>
      <Box>
        <Typography sx={{ marginTop: "10px" }}>Reviewables:</Typography>
        <List>{reviewableComponent}</List>
      </Box>
    </div>
  );
}

export default Topic;
