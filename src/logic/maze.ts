import Block from "../models/block";
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

export function mazeToBlocks(
  maze: Maze,
  cellWidth: number,
  wallWidth: number,
): Block[][] {
  const height = maze.length * cellWidth + (maze.length + 1) * wallWidth;
  const width = maze[0].length * cellWidth + (maze[0].length + 1) * wallWidth;

  const blocks: Block[][] = new Array(height);
  for (let y = 0; y < height; y++) {
    blocks[y] = new Array(width);
    for (let x = 0; x < width; x++) {
      blocks[y][x] = true;
    }
  }

  const clearRect = (
    blocks: Block[][],
    x: number,
    y: number,
    w: number,
    h: number,
  ) => {
    for (let y_offset = 0; y_offset < h; y_offset++) {
      for (let x_offset = 0; x_offset < w; x_offset++) {
        blocks[y + y_offset][x + x_offset] = false;
      }
    }
  };

  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[0].length; col++) {
      const cell = maze[row][col];

      const x = (1 + col) * wallWidth + col * cellWidth;
      const y = (1 + row) * wallWidth + row * cellWidth;
      clearRect(blocks, x, y, cellWidth, cellWidth);

      if (!cell.walls.top) {
        const wallX = x;
        const wallY = y - wallWidth;
        clearRect(blocks, wallX, wallY, cellWidth, wallWidth);
      }
      if (!cell.walls.right) {
        const wallX = x + cellWidth;
        const wallY = y;
        clearRect(blocks, wallX, wallY, wallWidth, cellWidth);
      }
      if (!cell.walls.bottom) {
        const wallX = x;
        const wallY = y + cellWidth;
        clearRect(blocks, wallX, wallY, cellWidth, wallWidth);
      }
      if (!cell.walls.left) {
        const wallX = x - wallWidth;
        const wallY = y;
        clearRect(blocks, wallX, wallY, wallWidth, cellWidth);
      }
    }
  }

  return blocks;
}

export function solutionToBlocks(
  maze: Maze,
  solution: Coordinate[],
  cellWidth: number,
  wallWidth: number,
): Block[][] {
  const height = maze.length * cellWidth + (maze.length + 1) * wallWidth;
  const width = maze[0].length * cellWidth + (maze[0].length + 1) * wallWidth;

  const blocks: Block[][] = new Array(height);
  for (let y = 0; y < height; y++) {
    blocks[y] = new Array(width);
    for (let x = 0; x < width; x++) {
      blocks[y][x] = false;
    }
  }

  solution.forEach((coordinate) => {
    const x = (1 + coordinate.col) * wallWidth + coordinate.col * cellWidth;
    const y = (1 + coordinate.row) * wallWidth + coordinate.row * cellWidth;
    blocks[y][x] = true;
  });

  return blocks;
}
