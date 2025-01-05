import { useState } from "react";
import "./App.css";
import Visualizer from "./components/Visualizer";
import ControlPanel from "./components/ControlPanel";
import Maze from "./models/maze";

function App() {
  const [maze, setMaze] = useState<Maze | null>();
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const handleToggle = () => {
    console.log("toggle!");
    setShowSolution(!showSolution);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Maze Generator</h1>
      <div className="container">
        <ControlPanel onGenerateClick={setMaze} />
      </div>
      {maze ? (
        <>
          <div className="container" style={{ padding: "25px" }}>
            Show Solution?
            <input
              type="checkbox"
              onChange={handleToggle}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <Visualizer maze={maze} showSolution={showSolution} />
        </>
      ) : (
        <div className="container">
          <div className="menu">
            Please use the controls above to generate a maze.
          </div>
        </div>
      )}

      <footer
        style={{
          textAlign: "center",
          margin: "50vh 0 2vh 0",
          fontSize: "0.75rem",
        }}
      >
        Copyright © 2025 -{" "}
        <a href="https://nsdigirolamo.com">Nicholas DiGirolamo</a>
      </footer>
    </>
  );
}

export default App;
