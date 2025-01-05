import { ReactElement, useEffect, useRef } from "react";
import { getCellAtCoordinate, solveMaze } from "../logic/maze";
import Maze from "../models/maze";
import Coordinate from "../models/coordinate";

interface VisualizerProps {
  maze: Maze;
  showSolution?: boolean;
}

function Visualizer({ maze, showSolution }: VisualizerProps): ReactElement {
  const cellSize = 25;
  const mazeWidth = maze[0].length;
  const mazeHeight = maze.length;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const padding = 10;
  const canvasWidth = 2 * padding + mazeWidth * cellSize;
  const canvasHeight = 2 * padding + mazeHeight * cellSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const context = canvas.getContext("2d");
    if (context === null) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const start = { row: 0, col: Math.floor(mazeWidth / 2.0) };
    const end = { row: mazeHeight - 1, col: Math.floor(mazeWidth / 2.0) };

    if (showSolution) {
      drawSolution(context, solveMaze(maze, start, end), cellSize, padding);
    }

    getCellAtCoordinate(maze, start).walls.top = false;
    getCellAtCoordinate(maze, end).walls.bottom = false;

    drawWalls(context, maze, cellSize, padding);

    getCellAtCoordinate(maze, start).walls.top = true;
    getCellAtCoordinate(maze, end).walls.bottom = true;
  }, [maze, showSolution]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        padding: "25px",
        height: canvasHeight,
        width: canvasWidth,
      }}
    />
  );
}

function drawWalls(
  context: CanvasRenderingContext2D,
  maze: Maze,
  cellSize: number,
  padding: number,
) {
  context.strokeStyle = "black";
  context.lineWidth = 2;
  context.beginPath();

  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[0].length; col++) {
      const cell = maze[row][col];
      const x = col * cellSize + padding;
      const y = row * cellSize + padding;

      if (cell.walls.top) {
        context.moveTo(x, y);
        context.lineTo(x + cellSize, y);
      }
      if (cell.walls.right) {
        context.moveTo(x + cellSize, y);
        context.lineTo(x + cellSize, y + cellSize);
      }
      if (cell.walls.bottom) {
        context.moveTo(x, y + cellSize);
        context.lineTo(x + cellSize, y + cellSize);
      }
      if (cell.walls.left) {
        context.moveTo(x, y);
        context.lineTo(x, y + cellSize);
      }
    }
  }

  context.closePath();
  context.stroke();
}

function drawSolution(
  context: CanvasRenderingContext2D,
  solution: Coordinate[],
  cellSize: number,
  padding: number,
) {
  context.strokeStyle = "red";
  context.lineWidth = 3;
  context.beginPath();

  for (let index = 0; index < solution.length - 1; index++) {
    const current = solution[index];
    const currentX = current.col * cellSize + padding;
    const currentY = current.row * cellSize + padding;

    const next = solution[index + 1];
    const nextX = next.col * cellSize + padding;
    const nextY = next.row * cellSize + padding;

    context.moveTo(currentX + cellSize / 2.0, currentY + cellSize / 2.0);
    context.lineTo(nextX + cellSize / 2.0, nextY + cellSize / 2.0);
  }

  context.closePath();
  context.stroke();
}

export default Visualizer;
