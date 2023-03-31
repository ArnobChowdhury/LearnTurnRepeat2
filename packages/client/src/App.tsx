import { useLoaderData, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import "./App.css";

function App() {
  const courses = useLoaderData();

  let courseComponents;
  if (Array.isArray(courses)) {
    courseComponents = courses.map((course, index) => {
      return (
        <Link to={`courses/${course}`}>
          <Card
            onClick={() => {}}
            sx={{ marginBottom: "20px", padding: "10px" }}
            key={index}
          >
            <Typography sx={{ fontSize: "24px", padding: "6px" }}>
              {course}
            </Typography>
          </Card>
        </Link>
      );
    });
  }

  return (
    <div>
      {courseComponents}
      <Card onClick={() => {}} sx={{ marginBottom: "20px", padding: "10px" }}>
        <Typography sx={{ fontSize: "24px", padding: "6px" }}>
          Add course
        </Typography>
      </Card>
    </div>
  );
}

export default App;
