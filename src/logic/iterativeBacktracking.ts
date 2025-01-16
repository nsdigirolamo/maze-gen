import Coordinate from "../models/coordinate";
import Maze from "../models/maze";
import { createMaze, isCoordinateInBounds } from "./maze";
import { genRandomInt } from "./random";

export function createIterativeBacktrackingMaze(
  width: number,
  height: number,
): Maze {
  const maze = createMaze(width, height);
  const visited: Set<string> = new Set<string>();
  const stack: Array<Coordinate> = new Array<Coordinate>();

  // 1 Choose the initial cell, mark it as visited and push it to the stack
  const start: Coordinate = [0, Math.floor(width / 2.0)];
  visited.add(JSON.stringify(start));
  stack.push(start);

  // 2 While the stack is not empty...
  while (stack.length !== 0) {
    // 2.1 Pop a cell from the stack and make it the current cell
    const current = stack.pop()!;

    const top = [current[0] - 1, current[1]];
    const bottom = [current[0] + 1, current[1]];
    const left = [current[0], current[1] - 1];
    const right = [current[0], current[1] + 1];
    const neighbors = ([top, bottom, left, right] as Coordinate[]).filter(
      (neighbor) => {
        return (
          isCoordinateInBounds(maze, neighbor) &&
          !visited.has(JSON.stringify(neighbor))
        );
      },
    );

    // 2.2 If the current cell has any neighbors which have not been visited...
    if (neighbors.length !== 0) {
      // 2.2.1 Push the current cell to the stack
      stack.push(current);
      // 2.2.2 Choose one of the unvisited neighbors
      const chosen = neighbors[genRandomInt(0, neighbors.length)];

      const currentCell = maze[current[0]][current[1]];
      const chosenCell = maze[chosen[0]][chosen[1]];

      // 2.2.3 Remove the wall between the current cell and chosen cell
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

      // 2.2.4 Mark the chosen cell as visited and push it to the stack
      visited.add(JSON.stringify(chosen));
      stack.push(chosen);
    }
  }

  return maze;
}
