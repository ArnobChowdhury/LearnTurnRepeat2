import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const courses = useLoaderData();

  let courseComponents;
  if (Array.isArray(courses)) {
    courseComponents = courses.map((course, index) => {
      console.log(course);
      return (
        <Card onClick={() => {}} sx={{ marginBottom: "20px" }} key={index}>
          <Typography sx={{ fontSize: "24px", padding: "6px" }}>
            {course}
          </Typography>
        </Card>
      );
    });
  }

  return (
    <div>
      {courseComponents}
      <Card onClick={() => {}} sx={{ marginBottom: "20px" }}>
        <Typography sx={{ fontSize: "24px", padding: "6px" }}>
          Add course
        </Typography>
      </Card>
      <label htmlFor="topic">Topics learned: </label>
      <input
        id="topic"
        name="topic"
        onChange={(e) => {
          setTopic(e.currentTarget.value);
        }}
        value={topic}
        style={{ padding: "10px", width: "200px" }}
      ></input>
    </div>
  );
}

export default App;
