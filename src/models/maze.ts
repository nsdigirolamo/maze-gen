import { createCell, Cell } from "./cell.ts";
import Coordinate from "./coordinate.ts";

export type Maze = Cell[][];

export function createMaze(width: number, height: number): Maze {
  let nodes: Cell[][] = new Array(height);
  for (let row = 0; row < height; row++) {
    nodes[row] = new Array(width);
    for (let col = 0; col < width; col++) {
      nodes[row][col] = createCell();
    }
  }
  return nodes;
}

export function getCellAtCoordinate(maze: Maze, coordinate: Coordinate) {
  return maze[coordinate.row][coordinate.col];
}
