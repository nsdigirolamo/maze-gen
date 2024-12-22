import Coordinate from "../models/coordinate";
import { createMaze, Maze } from "../models/maze";
import { randomInt } from "./random";

export function createIterativeBacktrackingMaze(
  width: number,
  height: number,
  start?: Coordinate,
): Maze {
  let maze = createMaze(width, height);
  const visited: Set<string> = new Set<string>();
  const stack: Array<Coordinate> = new Array<Coordinate>();

  start = start
    ? start
    : {
        row: randomInt(0, height),
        col: randomInt(0, width),
      };
  visited.add(JSON.stringify(start));
  stack.push(start);

  while (stack.length !== 0) {
    const current = stack.pop()!;

    const top: Coordinate = { row: current.row - 1, col: current.col };
    const bottom: Coordinate = { row: current.row + 1, col: current.col };
    const left: Coordinate = { row: current.row, col: current.col - 1 };
    const right: Coordinate = { row: current.row, col: current.col + 1 };

    const neighbors = [top, bottom, left, right].filter((neighbor) => {
      return (
        isCoordInBounds(neighbor, maze) &&
        !visited.has(JSON.stringify(neighbor))
      );
    });

    if (neighbors.length !== 0) {
      stack.push(current);
      const chosen = neighbors[randomInt(0, neighbors.length)];

      const currentCell = maze[current.row][current.col];
      const chosenCell = maze[chosen.row][chosen.col];

      if (chosen === top) {
        currentCell.walls.top = false;
        chosenCell.walls.bottom = false;
      } else if (chosen === bottom) {
        currentCell.walls.bottom = false;
        chosenCell.walls.top = false;
      } else if (chosen === left) {
        currentCell.walls.left = false;
        chosenCell.walls.right = false;
      } else if (chosen === right) {
        currentCell.walls.right = false;
        chosenCell.walls.left = false;
      }

      visited.add(JSON.stringify(chosen));
      stack.push(chosen);
    }
  }

  return maze;
}

function isCoordInBounds(coordinate: Coordinate, maze: Maze): boolean {
  const row = coordinate.row;
  const col = coordinate.col;
  const height = maze.length;
  const width = maze[0].length;
  return 0 <= row && 0 <= col && row < height && col < width;
}
