import Cell from "../models/cell";
import Coordinate from "../models/coordinate";
import Edge from "../models/edge";
import Maze from "../models/maze";

export function createMaze(width: number, height: number): Maze {
  let nodes: Cell[][] = new Array(height);
  for (let row = 0; row < height; row++) {
    nodes[row] = new Array(width);
    for (let col = 0; col < width; col++) {
      nodes[row][col] = {
        walls: { top: true, bottom: true, left: true, right: true },
      };
    }
  }
  return nodes;
}

export function getCellAtCoordinate(maze: Maze, coordinate: Coordinate) {
  return maze[coordinate.row][coordinate.col];
}

export function getEdges(maze: Maze): Edge[] {
  const height = maze.length;
  const width = maze[0].length;

  const edges: Edge[] = [];
  for (let row = 0; row < height; row++) {
    for (let col = row % 2; col < width; col = col + 2) {
      const c1: Coordinate = { row, col };

      if (row != 0) {
        const c2: Coordinate = { row: row - 1, col };
        const edge: Edge = { c1, c2 };
        edges.push(edge);
      }
      if (row != height - 1) {
        const c2: Coordinate = { row: row + 1, col };
        const edge: Edge = { c1, c2 };
        edges.push(edge);
      }
      if (col != 0) {
        const c2: Coordinate = { row, col: col - 1 };
        const edge: Edge = { c1, c2 };
        edges.push(edge);
      }
      if (col != width - 1) {
        const c2: Coordinate = { row, col: col + 1 };
        const edge: Edge = { c1, c2 };
        edges.push(edge);
      }
    }
  }

  return edges;
}

export function removeWallAtEdge(maze: Maze, edge: Edge): Maze {
  const cell1 = getCellAtCoordinate(maze, edge.c1);
  const cell2 = getCellAtCoordinate(maze, edge.c2);

  const rowDifference = edge.c1.row - edge.c2.row;
  const colDifference = edge.c1.col - edge.c2.col;

  if (rowDifference == 1) {
    cell1.walls.top = false;
    cell2.walls.bottom = false;
  }
  if (rowDifference == -1) {
    cell1.walls.bottom = false;
    cell2.walls.top = false;
  }
  if (colDifference == 1) {
    cell1.walls.left = false;
    cell2.walls.right = false;
  }
  if (colDifference == -1) {
    cell1.walls.right = false;
    cell2.walls.left = false;
  }

  return maze;
}
