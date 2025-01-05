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

export function solveMaze(
  maze: Maze,
  start: Coordinate,
  end: Coordinate,
): Coordinate[] {
  interface BfsNode {
    parent: BfsNode | null;
    coordinate: Coordinate;
  }

  const bfs = (root: BfsNode): BfsNode | null => {
    const queue: BfsNode[] = [root];
    const explored: Set<string> = new Set<string>([
      JSON.stringify(root.coordinate),
    ]);

    while (0 < queue.length) {
      const current = queue.shift()!;
      if (
        current.coordinate.row === end.row &&
        current.coordinate.col === end.col
      ) {
        return current;
      }

      const addNext = (nextCoordinate: Coordinate) => {
        if (!explored.has(JSON.stringify(nextCoordinate))) {
          explored.add(JSON.stringify(nextCoordinate));
          const next: BfsNode = {
            parent: current,
            coordinate: nextCoordinate,
          };
          queue.push(next);
        }
      };

      const cell = maze[current.coordinate.row][current.coordinate.col];
      if (!cell.walls.top) {
        addNext({
          row: current.coordinate.row - 1,
          col: current.coordinate.col,
        });
      }
      if (!cell.walls.bottom) {
        addNext({
          row: current.coordinate.row + 1,
          col: current.coordinate.col,
        });
      }
      if (!cell.walls.left) {
        addNext({
          row: current.coordinate.row,
          col: current.coordinate.col - 1,
        });
      }
      if (!cell.walls.right) {
        addNext({
          row: current.coordinate.row,
          col: current.coordinate.col + 1,
        });
      }
    }

    return null;
  };

  let solution: Coordinate[] = [];
  const endNode = bfs({ parent: null, coordinate: start });
  let currentNode = endNode;
  while (currentNode !== null) {
    solution = [currentNode.coordinate, ...solution];
    currentNode = currentNode.parent;
  }

  return solution;
}

export function CoordinateInBounds(maze: Maze, coordinate: Coordinate) {
  return (
    0 <= coordinate.row &&
    coordinate.row < maze.length &&
    0 <= coordinate.col &&
    coordinate.col < maze[0].length
  );
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
