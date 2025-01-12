import { ReactElement, useEffect, useRef } from "react";
import { solveMaze } from "../logic/maze";
import Maze from "../models/maze";
import Coordinate from "../models/coordinate";

interface VisualizerProps {
  maze: Maze;
  cellWidth: number;
  wallWidth: number;
  showSolution?: boolean;
}

function Visualizer({
  maze,
  cellWidth,
  wallWidth,
  showSolution,
}: VisualizerProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mazeWidth = maze[0].length;
  const mazeHeight = maze.length;

  const padding = 10;
  const canvasWidth =
    2 * padding + (mazeWidth + 1) * wallWidth + mazeWidth * cellWidth;
  const canvasHeight =
    2 * padding + (mazeHeight + 1) * wallWidth + mazeHeight * cellWidth;

  const start: Coordinate = { row: 0, col: 0 };
  const end: Coordinate = { row: mazeHeight - 1, col: mazeWidth - 1 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const context = canvas.getContext("2d");
    if (context === null) return;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawWalls(context, maze, padding, cellWidth, wallWidth);
    drawPadding(context, padding);

    if (showSolution) {
      drawSolution(
        context,
        solveMaze(maze, start, end),
        padding,
        cellWidth,
        wallWidth,
      );
    }
  }, [maze, showSolution, cellWidth, wallWidth]);

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
  padding: number,
  cellWidth: number,
  wallWidth: number,
) {
  context.fillStyle = "white";

  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[0].length; col++) {
      const cell = maze[row][col];

      const x = padding + (1 + col) * wallWidth + col * cellWidth;
      const y = padding + (1 + row) * wallWidth + row * cellWidth;

      context.fillRect(x, y, cellWidth, cellWidth);

      if (!cell.walls.top) {
        const wallX = x;
        const wallY = y - wallWidth;
        context.fillRect(wallX, wallY, cellWidth, wallWidth);
      }
      if (!cell.walls.right) {
        const wallX = x + cellWidth;
        const wallY = y;
        context.fillRect(wallX, wallY, wallWidth, cellWidth);
      }
      if (!cell.walls.bottom) {
        const wallX = x;
        const wallY = y + cellWidth;
        context.fillRect(wallX, wallY, cellWidth, wallWidth);
      }
      if (!cell.walls.left) {
        const wallX = x - wallWidth;
        const wallY = y;
        context.fillRect(wallX, wallY, wallWidth, cellWidth);
      }
    }
  }
}

function drawSolution(
  context: CanvasRenderingContext2D,
  solution: Coordinate[],
  padding: number,
  cellWidth: number,
  wallWidth: number,
) {
  context.strokeStyle = "red";
  context.lineWidth = 3;
  context.beginPath();

  for (let index = 0; index < solution.length - 1; index++) {
    const current = solution[index];
    const row = current.row;
    const col = current.col;

    const currentX =
      padding + (1 + col) * wallWidth + col * cellWidth + cellWidth / 2.0;
    const currentY =
      padding + (1 + row) * wallWidth + row * cellWidth + cellWidth / 2.0;

    const next = solution[index + 1];
    const nextRow = next.row;
    const nextCol = next.col;

    const nextX =
      padding +
      (1 + nextCol) * wallWidth +
      nextCol * cellWidth +
      cellWidth / 2.0;
    const nextY =
      padding +
      (1 + nextRow) * wallWidth +
      nextRow * cellWidth +
      cellWidth / 2.0;

    context.moveTo(currentX, currentY);
    context.lineTo(nextX, nextY);
  }

  context.closePath();
  context.stroke();
}

function drawPadding(context: CanvasRenderingContext2D, padding: number) {
  const width = context.canvas.width;
  const height = context.canvas.height;
  context.fillStyle = "white";

  context.fillRect(0, 0, width, padding);
  context.fillRect(0, 0, padding, width);
  context.fillRect(width - padding, 0, padding, height);
  context.fillRect(0, height - padding, width, padding);
}

export default Visualizer;
