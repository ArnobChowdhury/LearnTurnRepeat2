import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [state, setState] = useState("");
  console.log(state);
  return (
    <div>
      <label htmlFor="topic">Topics learned: </label>
      <input
        id="topic"
        name="topic"
        onChange={(e) => {
          setState(e.currentTarget.value);
        }}
        value={state}
        style={{ padding: "10px", width: "200px" }}
      ></input>
    </div>
  );
}

export default App;
