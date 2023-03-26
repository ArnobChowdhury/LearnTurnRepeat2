import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  console.log(topic);
  const courses = useLoaderData() as { name: string }[];
  console.log(courses);
  let courseComponents;
  if (Array.isArray(courses)) {
    courseComponents = courses.map((course) => {
      return (
        <Card onClick={() => {}} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography sx={{ fontSize: "24px", padding: "6px" }}>
              {course.name}
            </Typography>
          </CardContent>
        </Card>
      );
    });
  }

  return (
    <div>
      {courseComponents}
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
