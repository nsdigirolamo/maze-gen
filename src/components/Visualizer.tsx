import { useEffect, useRef } from "react";
import { Maze } from "../models/maze";
import Coordinate from "../models/coordinate";

interface VisualizerProps {
  maze: Maze;
  width: number;
  height?: number;
  start?: Coordinate;
  end?: Coordinate;
}

function Visualizer(props: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const width = props.width;
  const height = props.height ? props.height : props.width;
  const start = props.start ? props.start : { row: 0, col: 0 };
  const end = props.end ? props.end : { row: width - 1, col: width - 1 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const context = canvas.getContext("2d");
    if (context === null) return;

    canvas.width = width;
    canvas.height = height;

    const cellSize = Math.min(
      canvas.width / props.maze[0].length,
      canvas.height / props.maze.length,
    );

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "black";
    context.lineWidth = 2;

    context.fillStyle = "green";
    context.fillRect(
      start.col * cellSize,
      start.row * cellSize,
      cellSize,
      cellSize,
    );

    context.fillStyle = "red";
    context.fillRect(
      end.col * cellSize,
      end.row * cellSize,
      cellSize,
      cellSize,
    );

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
  }, [props.maze, start, end]);

  return <canvas ref={canvasRef} style={{ width: width, height: height }} />;
}

export default Visualizer;
