import { useEffect, useRef } from "react";
import { getCellAtCoordinate, Maze } from "../models/maze";
import Coordinate from "../models/coordinate";

interface VisualizerProps {
  maze: Maze;
  cellSize?: number;
  start?: Coordinate;
  end?: Coordinate;
}

function Visualizer(props: VisualizerProps) {
  const cellSize = props.cellSize ? props.cellSize : 25;
  const mazeWidth = props.maze[0].length;
  const mazeHeight = props.maze.length;

  const start = props.start
    ? props.start
    : { row: 0, col: Math.floor(mazeWidth / 2.0) };
  const end = props.end
    ? props.end
    : { row: mazeHeight - 1, col: Math.floor(mazeWidth / 2.0) };
  getCellAtCoordinate(props.maze, start).walls.top = false;
  getCellAtCoordinate(props.maze, end).walls.bottom = false;

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

    for (let row = 0; row < props.maze.length; row++) {
      for (let col = 0; col < props.maze[0].length; col++) {
        const cell = props.maze[row][col];
        const x = col * cellSize + padding;
        const y = row * cellSize + padding;

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
        height: canvasHeight,
        width: canvasWidth,
      }}
    />
  );
}

export default Visualizer;
