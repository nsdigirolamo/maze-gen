import { ReactElement } from "react";
import Maze from "../models/maze";
import Coordinate from "../models/coordinate";
import { useWatch } from "react-hook-form";
import Inputs from "../models/inputs";
import MazeVisual from "./MazeVisual";
import SolutionVisual from "./SolutionVisual";

const scale = 10;

interface VisualizerProps {
  maze: Maze;
}

function Visualizer({ maze }: VisualizerProps): ReactElement {
  const [
    showSolution,
    inputCorridorWidth,
    inputWallWidth,
    inputStartRow,
    inputStartColumn,
    inputEndRow,
    inputEndColumn,
  ] = useWatch<Inputs>({
    name: [
      "showSolution",
      "corridorWidth",
      "wallWidth",
      "startRow",
      "startColumn",
      "endRow",
      "endColumn",
    ],
  });

  const rowCount = maze.length;
  const columnCount = maze[0].length;

  const wallWidth = cleanWallWidth(inputWallWidth as string);
  const corridorWidth = cleanCorridorWidth(inputCorridorWidth as string);

  const svgWidth = (columnCount + 1) * wallWidth + columnCount * corridorWidth;
  const svgHeight = (rowCount + 1) * wallWidth + rowCount * corridorWidth;

  const start: Coordinate = cleanCoordinate(
    [inputStartRow as string, inputStartColumn as string],
    columnCount,
    rowCount,
  );

  const end: Coordinate = cleanCoordinate(
    [inputEndRow as string, inputEndColumn as string],
    columnCount,
    rowCount,
  );

  return (
    <svg
      style={{ display: "block", width: svgWidth, height: svgHeight }}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
    >
      <MazeVisual
        maze={maze}
        width={svgWidth}
        height={svgHeight}
        corridorWidth={corridorWidth}
        wallWidth={wallWidth}
      />
      <SolutionVisual
        maze={maze}
        start={start}
        end={end}
        corridorWidth={corridorWidth}
        wallWidth={wallWidth}
        isDisplayed={showSolution as boolean}
      />
    </svg>
  );
}

function cleanWallWidth(wallWidth: string): number {
  return scale * (+wallWidth < 1 ? 1 : +wallWidth);
}

function cleanCorridorWidth(corridorWidth: string): number {
  return scale * (+corridorWidth < 1 ? 1 : +corridorWidth);
}

function cleanCoordinate(
  coord: [string, string],
  width: number,
  height: number,
): Coordinate {
  const row = +coord[0] < 0 ? 0 : height <= +coord[0] ? height - 1 : +coord[0];
  const column = +coord[1] < 0 ? 0 : width <= +coord[1] ? width - 1 : +coord[1];
  return [row, column];
}

export default Visualizer;
