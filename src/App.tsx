import { useEffect, useState } from "react";
import "./App.css";
import Visualizer from "./components/Visualizer";
import { createIterativeBacktrackingMaze } from "./logic/iterativeBacktracking";
import NumberSelectorTr from "./components/NumberSelectorTr";
import { createKruskalsMaze } from "./logic/kruskals";

const mazeCreatorFunctions = [
  {
    name: "Backtracking",
    creator: createIterativeBacktrackingMaze,
  },
  {
    name: "Kruskal's",
    creator: createKruskalsMaze,
  },
];

function App() {
  const [height, setHeight] = useState(10);
  const [width, setWidth] = useState(10);

  const [creatorFunctionIndex, setCreatorFunctionIndex] = useState(0);
  const handleSelect = (newValue: number) => {
    setCreatorFunctionIndex(
      Math.min(Math.max(newValue, 0), mazeCreatorFunctions.length - 1),
    );
  };

  const [maze, setMaze] = useState(
    mazeCreatorFunctions[creatorFunctionIndex].creator(width, height),
  );
  const [updater, setUpdater] = useState(false);

  useEffect(() => {
    setMaze(mazeCreatorFunctions[creatorFunctionIndex].creator(width, height));
  }, [width, height, updater, creatorFunctionIndex]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Maze Generator</h1>
      <div className="menu">
        <table>
          <tbody>
            <NumberSelectorTr
              label="Width"
              initialValue={width}
              onChange={setWidth}
            />
            <NumberSelectorTr
              label="Height"
              initialValue={height}
              onChange={setHeight}
            />
            <tr>
              <td className="label">Algorithm</td>
              <td>
                <select onChange={(event) => handleSelect(+event.target.value)}>
                  {mazeCreatorFunctions.map((element, index) => (
                    <option value={index} key={index}>
                      {element.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={(_) => setUpdater(!updater)}>Generate Maze</button>
        </div>
      </div>

      <Visualizer maze={maze} />

      <footer
        style={{
          textAlign: "center",
          margin: "50vh 0 2vh 0",
          fontSize: "0.75rem",
        }}
      >
        Copyright © 2024 -{" "}
        <a href="https://nsdigirolamo.com">Nicholas DiGirolamo</a>
      </footer>
    </>
  );
}

export default App;
