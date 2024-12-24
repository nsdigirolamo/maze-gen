import { useEffect, useRef } from "react";
import { Maze } from "../models/maze";
import Coordinate from "../models/coordinate";

interface VisualizerProps {
  maze: Maze;
  cellSize?: number;
  start: Coordinate;
  end: Coordinate;
}

function Visualizer(props: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const width = props.maze[0].length;
  const height = props.maze.length;
  const cellSize = props.cellSize ? props.cellSize : 15;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas === null) return;

    const context = canvas.getContext("2d");
    if (context === null) return;

    canvas.width = cellSize * width;
    canvas.height = cellSize * height;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "black";
    context.lineWidth = 2;

    context.fillStyle = "green";
    context.fillRect(
      props.start.col * cellSize,
      props.start.row * cellSize,
      cellSize,
      cellSize,
    );

    context.fillStyle = "red";
    context.fillRect(
      props.end.col * cellSize,
      props.end.row * cellSize,
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
  }, [props.maze, props.start, props.end]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        paddingLeft: "0px",
        paddingRight: "0px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        height: cellSize * height,
        width: cellSize * width,
      }}
    />
  );
}

export default Visualizer;
