import { useEffect, useRef } from "react";
import type { Maze } from "../models/maze";

interface MazeProps {
  maze: Maze;
  width: number;
}

export function Maze(props: MazeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const context = canvas.getContext("2d");
    if (context === null) return;

    canvas.width = props.width;
    canvas.height = props.width;

    const cellSize = Math.floor(
      Math.min(
        canvas.width / props.maze[0].length,
        canvas.height / props.maze.length,
      ),
    );

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "black";
    context.lineWidth = 1;

    context.fillStyle = "red";
    context.fillRect(0, 0, cellSize, cellSize);

    for (let row = 0; row < props.maze.length; row++) {
      for (let col = 0; col < props.maze[0].length; col++) {
        const cell = props.maze[row][col];
        const x = col * cellSize;
        const y = row * cellSize;

        context.beginPath();

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

        context.stroke();
      }
    }
  }, [props.maze]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: props.width, height: props.width }}
    />
  );
}
