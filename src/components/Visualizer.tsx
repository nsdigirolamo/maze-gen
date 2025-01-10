import { ReactElement, useEffect, useRef } from "react";
import { solveMaze } from "../logic/maze";
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

  const start: Coordinate = { row: 0, col: 0 };
  const end: Coordinate = { row: mazeHeight - 1, col: mazeWidth - 1 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const context = canvas.getContext("2d");
    if (context === null) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (showSolution) {
      drawSolution(context, solveMaze(maze, start, end), cellSize, padding);
    }

    drawWalls(context, maze, cellSize, padding);
  }, [maze, showSolution]);

  return (
    <canvas
      ref={canvasRef}
      style={{ height: canvasHeight, width: canvasWidth }}
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
    const currentX = current.col * cellSize + padding + cellSize / 2.0;
    const currentY = current.row * cellSize + padding + cellSize / 2.0;

    const next = solution[index + 1];
    const nextX = next.col * cellSize + padding + cellSize / 2.0;
    const nextY = next.row * cellSize + padding + cellSize / 2.0;

    context.moveTo(currentX, currentY);
    context.lineTo(nextX, nextY);
  }

  context.closePath();
  context.stroke();
}

export default Visualizer;
