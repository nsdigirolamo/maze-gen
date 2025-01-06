import { useState } from "react";
import "./App.css";
import Visualizer from "./components/Visualizer";
import ControlPanel from "./components/ControlPanel";
import Maze from "./models/maze";
import MAZE_CREATORS from "./constants/maze-creators";
import ControlPanelData from "./models/control-panel-data";
import DEFAULT_CONTROL_PANEL_DATA from "./constants/control-panel-data";

function App() {
  const [maze, setMaze] = useState<Maze | null>();
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const handleControlPanelSubmit = (data: ControlPanelData) => {
    const mazeCreator = MAZE_CREATORS[data.mazeCreatorIndex].function;
    const newMaze = mazeCreator(data.width, data.height);
    setMaze(newMaze);
  };

  const handleShowSolutionToggle = () => {
    setShowSolution(!showSolution);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Maze Generator</h1>
      <div className="container">
        <ControlPanel
          defaultData={DEFAULT_CONTROL_PANEL_DATA}
          onSubmit={handleControlPanelSubmit}
        />
      </div>
      {maze ? (
        <>
          <div className="container" style={{ padding: "25px" }}>
            Show Solution?
            <input
              type="checkbox"
              onChange={handleShowSolutionToggle}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <Visualizer maze={maze} showSolution={showSolution} />
        </>
      ) : (
        <div className="container">
          <div className="menu" style={{ textAlign: "center" }}>
            Use the controls above to generate a maze.
            <br />
            Large mazes may take a few minutes to generate and solve.
          </div>
        </div>
      )}

      <footer>
        Copyright © 2025 -{" "}
        <a href="https://nsdigirolamo.com">Nicholas DiGirolamo</a>
      </footer>
    </>
  );
}

export default App;
