import { ReactElement, useEffect, useRef } from "react";
import { getCellAtCoordinate, Maze } from "../models/maze";

interface VisualizerProps {
  maze: Maze;
}

export default function Visualizer({ maze }: VisualizerProps): ReactElement {
  const cellSize = 25;
  const mazeWidth = maze[0].length;
  const mazeHeight = maze.length;

  const start = { row: 0, col: Math.floor(mazeWidth / 2.0) };
  getCellAtCoordinate(maze, start).walls.top = false;

  const end = { row: mazeHeight - 1, col: Math.floor(mazeWidth / 2.0) };
  getCellAtCoordinate(maze, end).walls.bottom = false;

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

    context.stroke();
    context.closePath();
  }, [maze, start, end]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        paddingLeft: "0px",
        paddingRight: "0px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        height: canvasHeight,
        width: canvasWidth,
      }}
    />
  );
}
