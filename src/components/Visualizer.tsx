import { ReactElement, useEffect, useRef } from "react";
import Maze from "../models/maze";
import Coordinate from "../models/coordinate";
import { create, select } from "d3";
import { area, line } from "d3-shape";
import { solveMaze } from "../logic/maze";
import { Selection } from "d3-selection";
import { useWatch } from "react-hook-form";
import Inputs from "../models/inputs";

interface VisualizerProps {
  maze: Maze;
}

const scale = 10;

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

function Visualizer({ maze }: VisualizerProps): ReactElement {
  const svgRef = useRef<SVGSVGElement>(null);

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

  const height = maze.length;
  const width = maze[0].length;

  const wallWidth = cleanWallWidth(inputWallWidth as string);
  const corridorWidth = cleanCorridorWidth(inputCorridorWidth as string);

  const start: Coordinate = cleanCoordinate(
    [inputStartRow as string, inputStartColumn as string],
    width,
    height,
  );
  const end: Coordinate = cleanCoordinate(
    [inputEndRow as string, inputEndColumn as string],
    width,
    height,
  );

  const svgWidth = (width + 1) * wallWidth + width * corridorWidth;
  const svgHeight = (height + 1) * wallWidth + height * corridorWidth;

  const backgroundGroup = create("svg:g").append(() =>
    createFilledAreaSelection([0, 0], svgWidth, svgHeight, "black").node(),
  );

  const corridorGroup = create("svg:g").append(() =>
    createCorridorsSelection(maze, corridorWidth, wallWidth).node(),
  );

  const solution = solveMaze(maze, start, end);
  const solutionGroup = create("svg:g").append(() =>
    createSolutionSelection(solution, +corridorWidth, +wallWidth).node(),
  );

  useEffect(() => {
    const svg = svgRef.current;
    if (svg === null) return;

    select(svg).selectChildren().remove();
    select(svg).attr("width", svgWidth).attr("height", svgHeight);
    select(svg).append(() => backgroundGroup.node());
    select(svg).append(() => corridorGroup.node());

    if (showSolution as boolean) {
      select(svg).append(() => solutionGroup.node());
    }
  }, [maze, showSolution, corridorWidth, wallWidth, start, end]);

  return <svg ref={svgRef} />;
}

function createCorridorsSelection(
  maze: Maze,
  corridorWidth: number,
  wallWidth: number,
) {
  let filledAreaSelection = create("svg:g");

  maze.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      const x = (1 + colIndex) * wallWidth + colIndex * corridorWidth;
      const y = (1 + rowIndex) * wallWidth + rowIndex * corridorWidth;

      filledAreaSelection.append(() =>
        createFilledAreaSelection(
          [x, y],
          corridorWidth,
          corridorWidth,
          "white",
        ).node(),
      );

      if (!cell.walls.top) {
        const wallX = x;
        const wallY = y - wallWidth;
        filledAreaSelection.append(() =>
          createFilledAreaSelection(
            [wallX, wallY],
            corridorWidth,
            wallWidth,
            "white",
          ).node(),
        );
      }
      if (!cell.walls.bottom) {
        const wallX = x;
        const wallY = y + wallWidth;
        filledAreaSelection.append(() =>
          createFilledAreaSelection(
            [wallX, wallY],
            corridorWidth,
            wallWidth,
            "white",
          ).node(),
        );
      }
      if (!cell.walls.left) {
        const wallX = x - wallWidth;
        const wallY = y;
        filledAreaSelection.append(() =>
          createFilledAreaSelection(
            [wallX, wallY],
            wallWidth,
            corridorWidth,
            "white",
          ).node(),
        );
      }
      if (!cell.walls.right) {
        const wallX = x + wallWidth;
        const wallY = y;
        filledAreaSelection.append(() =>
          createFilledAreaSelection(
            [wallX, wallY],
            wallWidth,
            corridorWidth,
            "white",
          ).node(),
        );
      }
    }),
  );

  return filledAreaSelection;
}

function createSolutionSelection(
  solution: Coordinate[],
  corridorWidth: number,
  wallWidth: number,
): Selection<Element, undefined, null, undefined> {
  const points: Coordinate[] = solution.map((coordinate) => {
    const x =
      (1 + coordinate[1]) * wallWidth +
      coordinate[1] * corridorWidth +
      corridorWidth / 2.0;
    const y =
      (1 + coordinate[0]) * wallWidth +
      coordinate[0] * corridorWidth +
      corridorWidth / 2.0;
    return [x, y];
  });

  return createLineSelection(points);
}

function createFilledAreaSelection(
  coordinate: Coordinate,
  width: number,
  height: number,
  fill: string,
): Selection<Element, Coordinate[], null, undefined> {
  const points: Coordinate[] = [
    coordinate,
    [coordinate[0] + width, coordinate[1]],
    [coordinate[0] + width, coordinate[1] + height],
    [coordinate[0], coordinate[1] + height],
  ];

  return create("svg:path").datum(points).attr("d", area()).attr("fill", fill);
}

function createLineSelection(
  path: Coordinate[],
): Selection<Element, undefined, null, undefined> {
  const lineGenerator = line();
  const pathData = lineGenerator(path);
  return create("svg:path")
    .attr("d", pathData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 3);
}

export default Visualizer;
