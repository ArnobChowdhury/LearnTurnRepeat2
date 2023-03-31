import { useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import "./App.css";

function Topic() {
  const [topic, setTopic] = useState("");
  const { courseName } = useParams();

  // to do move this react router action
  const handleSubmission = async () => {
    const submissionUrl = `http://localhost:5174/api/topic/${courseName}`;
    const data = { topic };
    await axios.post(submissionUrl, data);
    setTopic("");
  };

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
      </Box>
    </div>
  );
}

export default Topic;
