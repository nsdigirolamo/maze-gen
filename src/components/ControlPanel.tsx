import { ReactElement, useState } from "react";
import NumberSelectorTr from "./NumberSelectorTr";
import { createIterativeBacktrackingMaze } from "../logic/iterativeBacktracking";
import { createKruskalsMaze } from "../logic/kruskals";
import { Maze } from "../models/maze";

interface ControlPanelProps {
  onGenerate: (newMaze: Maze) => void;
}

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

export default function ControlPanel({
  onGenerate,
}: ControlPanelProps): ReactElement {
  const [height, setHeight] = useState(10);
  const [width, setWidth] = useState(10);
  const [creatorFunctionIndex, setCreatorFunctionIndex] = useState(0);

  const handleSelect = (newValue: number) => {
    setCreatorFunctionIndex(newValue);
  };

  const handleClick = () => {
    const newMaze = mazeCreatorFunctions[creatorFunctionIndex].creator(
      width,
      height,
    );
    onGenerate(newMaze);
  };

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
          <button onClick={handleClick}>Generate Maze</button>
        </div>
      </div>
    </>
  );
}
