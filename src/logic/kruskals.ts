import Coordinate from "../models/coordinate";
import Maze from "../models/maze";
import { createMaze, getEdges, removeWallAtEdge } from "./maze";
import { genRandomInt } from "./random";

export function createKruskalsMaze(width: number, height: number): Maze {
  let maze = createMaze(width, height);
  // 1 Create a list of all walls, and create a set for each cell, each
  // containing just that one cell
  const edges = getEdges(maze);
  // Key: stringified Coordinate -> Value: Set of stringified Coordinates
  const setMap: Map<string, Set<string>> = new Map<string, Set<string>>();
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[0].length; col++) {
      const coord: Coordinate = { row, col };
      setMap.set(JSON.stringify(coord), new Set([JSON.stringify(coord)]));
    }
  }

  // 2 For each wall, in some random order...
  while (0 < edges.length) {
    const index = genRandomInt(0, edges.length);
    const edge = edges.splice(index, 1)[0];

    const set1 = setMap.get(JSON.stringify(edge.c1))!;
    const set2 = setMap.get(JSON.stringify(edge.c2))!;

    const isConnected =
      set1.has(JSON.stringify(edge.c2)) && set2.has(JSON.stringify(edge.c1));

    // 2.1 If the cells divided by this wall belong to distinct sets:
    if (!isConnected) {
      // 2.1.1 Remove the current wall
      maze = removeWallAtEdge(maze, edge);
      // 2.1.2 Join the sets of the formerly divided cells
      const newSet = new Set([...set1, ...set2]);
      newSet.forEach((element) => setMap.set(element, newSet));
    }
  }

  return maze;
}
