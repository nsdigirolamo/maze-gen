import { useEffect, useState } from "react";
import "./App.css";
import Visualizer from "./components/Visualizer";
import { createIterativeBacktrackingMaze } from "./logic/iterativeBacktracking";
import Coordinate from "./models/coordinate";
import CoordinateSelectorTr from "./components/CoordinateSelectorTr";

function App() {
  const [size, setSize] = useState(10);
  const [start, setStart] = useState<Coordinate>({ row: 0, col: 0 });
  const [end, setEnd] = useState<Coordinate>({ row: size - 1, col: size - 1 });
  const [maze, setMaze] = useState(
    createIterativeBacktrackingMaze(size, size, start),
  );

  const handleSize = (newSize: number) => {
    setSize(newSize <= 0 ? 1 : newSize);
  };

  useEffect(() => {
    setMaze(createIterativeBacktrackingMaze(size, size, start));
  }, [size]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Maze Generator</h1>
      <table className="menu">
        <tr>
          <td className="label">Size</td>
          <td>
            <input
              type="number"
              onChange={(event) => handleSize(+event.target.value)}
              value={"" + size}
            />
          </td>
        </tr>
        <CoordinateSelectorTr
          initialValue={start}
          onChange={setStart}
          width={size}
          height={size}
          label="Start Cell"
        />
        <CoordinateSelectorTr
          initialValue={end}
          onChange={setEnd}
          width={size}
          height={size}
          label="End Cell"
        />
      </table>
      <Visualizer
        width={Math.floor(window.innerHeight - 100)}
        maze={maze}
        start={start}
        end={end}
      />
      <footer
        style={{
          textAlign: "center",
          margin: "10vh 0 2vh 0",
          fontSize: "0.75rem",
        }}
      >
        Created by <a href="https://nsdigirolamo.com">Nicholas DiGirolamo</a>
      </footer>
    </>
  );
}

export default App;
