import { createCell, Cell } from "./cell.ts";

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
