import { ReactElement, useEffect, useRef } from "react";
import Maze from "../models/maze";
import Coordinate from "../models/coordinate";
import { select } from "d3";
import { area, line } from "d3-shape";
import { solveMaze } from "../logic/maze";

interface VisualizerProps {
  maze: Maze;
  showSolution: boolean;
  corridorWidth: number;
  wallWidth: number;
  start: Coordinate;
  end: Coordinate;
}

function Visualizer({
  maze,
  showSolution,
  corridorWidth,
  wallWidth,
  start,
  end,
}: VisualizerProps): ReactElement {
  const svgRef = useRef<SVGSVGElement>(null);

  const mazeRows = maze.length;
  const mazeColumns = maze[0].length;

  const svgWidth = (mazeColumns + 1) * wallWidth + mazeColumns * corridorWidth;
  const svgHeight = (mazeRows + 1) * wallWidth + mazeRows * corridorWidth;

  useEffect(() => {
    const svg = svgRef.current;
    if (svg === null) return;
    select(svg).selectChildren().remove();
    select(svg).attr("width", svgWidth).attr("height", svgHeight);

    const g = select(svg).append("g").node()!;
    fillArea(g, [0, 0], svgWidth, svgHeight, "black");
    drawCorridors(g, maze, corridorWidth, wallWidth);

    if (showSolution) {
      const g = select(svg).append("g").node()!;
      const solution = solveMaze(maze, start, end);
      drawSolution(g, solution, corridorWidth, wallWidth);
    }
  }, [maze, showSolution, corridorWidth, wallWidth, start, end]);

  return <svg ref={svgRef} />;
}

function drawCorridors(
  svg: SVGElement,
  maze: Maze,
  corridorWidth: number,
  wallWidth: number,
) {
  maze.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      const x = (1 + colIndex) * wallWidth + colIndex * corridorWidth;
      const y = (1 + rowIndex) * wallWidth + rowIndex * corridorWidth;

      fillArea(svg, [x, y], corridorWidth, corridorWidth, "white");

      if (!cell.walls.top) {
        const wallX = x;
        const wallY = y - wallWidth;
        fillArea(svg, [wallX, wallY], corridorWidth, wallWidth, "white");
      }
      if (!cell.walls.bottom) {
        const wallX = x;
        const wallY = y + wallWidth;
        fillArea(svg, [wallX, wallY], corridorWidth, wallWidth, "white");
      }
      if (!cell.walls.left) {
        const wallX = x - wallWidth;
        const wallY = y;
        fillArea(svg, [wallX, wallY], wallWidth, corridorWidth, "white");
      }
      if (!cell.walls.right) {
        const wallX = x + wallWidth;
        const wallY = y;
        fillArea(svg, [wallX, wallY], wallWidth, corridorWidth, "white");
      }
    }),
  );
}

function drawSolution(
  svg: SVGElement,
  solution: Coordinate[],
  corridorWidth: number,
  wallWidth: number,
) {
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

  drawLine(svg, points);
}

function fillArea(
  svg: SVGElement,
  coordinate: Coordinate,
  width: number,
  height: number,
  fill: string,
) {
  const points: Coordinate[] = [
    coordinate,
    [coordinate[0] + width, coordinate[1]],
    [coordinate[0] + width, coordinate[1] + height],
    [coordinate[0], coordinate[1] + height],
  ];

  select(svg).append("path").datum(points).attr("d", area()).attr("fill", fill);
}

function drawLine(svg: SVGElement, path: Coordinate[]) {
  const lineGenerator = line();
  const pathData = lineGenerator(path);
  select(svg)
    .append("path")
    .attr("d", pathData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 3);
}

export default Visualizer;
