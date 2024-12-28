import Coordinate from "../models/coordinate";
import { getEdges, createMaze, Maze, removeWallAtEdge } from "../models/maze";
import { genRandomInt } from "./random";

export function createKruskalsMaze(width: number, height: number): Maze {
  let maze = createMaze(width, height);
  // 1 Create a list of all walls, and create a set for each cell, each
  // containing just that one cell
  const edges = getEdges(maze);
  const sets: Set<string>[] = [];
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[0].length; col++) {
      const coord: Coordinate = { row, col };
      sets.push(new Set([JSON.stringify(coord)]));
    }
  }

  // 2 For each wall, in some random order...
  while (0 < edges.length) {
    const index = genRandomInt(0, edges.length);
    const edge = edges.splice(index, 1)[0];

    const isConnected = sets.some(
      (set) =>
        set.has(JSON.stringify(edge.c1)) && set.has(JSON.stringify(edge.c2)),
    );

    // 2.1 If the cells divided by this wall belong to distinct sets:
    if (!isConnected) {
      // 2.1.1 Remove the current wall
      maze = removeWallAtEdge(maze, edge);
      // 2.1.2 Join the sets of the formerly divided cells
      const index1 = sets.findIndex((set) => set.has(JSON.stringify(edge.c1)));
      const set1 = sets.splice(index1, 1)[0];
      const index2 = sets.findIndex((set) => set.has(JSON.stringify(edge.c2)));
      const set2 = sets.splice(index2, 1)[0];

      const newSet = new Set([...set1, ...set2]);
      sets.push(newSet);
    }
  }

  return maze;
}
