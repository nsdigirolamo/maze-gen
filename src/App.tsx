import { useState } from "react";
import "./App.css";
import Visualizer from "./components/Visualizer";
import ControlPanel from "./components/ControlPanel";
import { Maze } from "./models/maze";

function App() {
  const [maze, setMaze] = useState<Maze | null>();

  return (
    <>
      <ControlPanel onGenerate={setMaze} />
      {maze ? (
        <Visualizer maze={maze} />
      ) : (
        <div style={{ textAlign: "center", height: "100vh" }}>
          <span className="menu">
            Please use the controls above to generate a maze.
          </span>
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
