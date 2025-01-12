import { ReactElement, useEffect, useRef } from "react";
import { solveMaze } from "../logic/maze";
import Maze from "../models/maze";
import Coordinate from "../models/coordinate";

interface VisualizerProps {
  maze: Maze;
  corridorWidth?: number;
  wallWidth?: number;
  showSolution?: boolean;
}

function Visualizer({
  maze,
  corridorWidth,
  wallWidth,
  showSolution,
}: VisualizerProps): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mazeWidth = maze[0].length;
  const mazeHeight = maze.length;

  const padding = 10;
  const cellSize = corridorWidth ? corridorWidth : 25;
  const wallSize = wallWidth ? wallWidth : 10;

  const canvasWidth =
    2 * padding + (mazeWidth + 1) * wallSize + mazeWidth * cellSize;
  const canvasHeight =
    2 * padding + (mazeHeight + 1) * wallSize + mazeHeight * cellSize;

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

    drawWalls(context, maze, padding, cellSize, wallSize);
    drawPadding(context, padding);

    if (showSolution) {
      drawSolution(
        context,
        solveMaze(maze, start, end),
        padding,
        cellSize,
        wallSize,
      );
    }
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
  padding: number,
  cellSize: number,
  wallSize: number,
) {
  context.fillStyle = "white";

  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[0].length; col++) {
      const cell = maze[row][col];

      const x = padding + (1 + col) * wallSize + col * cellSize;
      const y = padding + (1 + row) * wallSize + row * cellSize;

      context.fillRect(x, y, cellSize, cellSize);

      if (!cell.walls.top) {
        const wallX = x;
        const wallY = y - wallSize;
        context.fillRect(wallX, wallY, cellSize, wallSize);
      }
      if (!cell.walls.right) {
        const wallX = x + cellSize;
        const wallY = y;
        context.fillRect(wallX, wallY, wallSize, cellSize);
      }
      if (!cell.walls.bottom) {
        const wallX = x;
        const wallY = y + cellSize;
        context.fillRect(wallX, wallY, cellSize, wallSize);
      }
      if (!cell.walls.left) {
        const wallX = x - wallSize;
        const wallY = y;
        context.fillRect(wallX, wallY, wallSize, cellSize);
      }
    }
  }
}

function drawSolution(
  context: CanvasRenderingContext2D,
  solution: Coordinate[],
  padding: number,
  cellSize: number,
  wallSize: number,
) {
  context.strokeStyle = "red";
  context.lineWidth = 3;
  context.beginPath();

  for (let index = 0; index < solution.length - 1; index++) {
    const current = solution[index];
    const row = current.row;
    const col = current.col;

    const currentX =
      padding + (1 + col) * wallSize + col * cellSize + cellSize / 2.0;
    const currentY =
      padding + (1 + row) * wallSize + row * cellSize + cellSize / 2.0;

    const next = solution[index + 1];
    const nextRow = next.row;
    const nextCol = next.col;

    const nextX =
      padding + (1 + nextCol) * wallSize + nextCol * cellSize + cellSize / 2.0;
    const nextY =
      padding + (1 + nextRow) * wallSize + nextRow * cellSize + cellSize / 2.0;

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
