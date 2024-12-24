import { useEffect, useState } from "react";
import "./App.css";
import Visualizer from "./components/Visualizer";
import { createIterativeBacktrackingMaze } from "./logic/iterativeBacktracking";
import Coordinate from "./models/coordinate";
import CoordinateSelectorTr from "./components/CoordinateSelectorTr";
import NumberSelectorTr from "./components/NumberSelectorTr";

function App() {
  const [height, setHeight] = useState(10);
  const [width, setWidth] = useState(10);
  const [start, setStart] = useState<Coordinate>({ row: 0, col: 0 });
  const [end, setEnd] = useState<Coordinate>({
    row: height - 1,
    col: width - 1,
  });
  const [maze, setMaze] = useState(
    createIterativeBacktrackingMaze(width, height, start),
  );

  useEffect(() => {
    setMaze(createIterativeBacktrackingMaze(width, height, start));
    setStart({
      row: Math.min(start.row, height - 1),
      col: Math.min(start.col, width - 1),
    });
    setEnd({
      row: Math.min(end.row, height - 1),
      col: Math.min(end.col, width - 1),
    });
  }, [width, height]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Maze Generator</h1>
      <table className="menu">
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
          <CoordinateSelectorTr
            label="Start Cell"
            initialValue={start}
            onChange={setStart}
            maxRowValue={height}
            maxColValue={width}
          />
          <CoordinateSelectorTr
            label="End Cell"
            initialValue={end}
            onChange={setEnd}
            maxRowValue={height}
            maxColValue={width}
          />
        </tbody>
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
