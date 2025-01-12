import { createIterativeBacktrackingMaze } from "../logic/iterativeBacktracking";
import { createKruskalsMaze } from "../logic/kruskals";
import { createMaze } from "../logic/maze";

const MAZE_CREATORS = [
  {
    name: "Backtracking",
    function: createIterativeBacktrackingMaze,
  },
  {
    name: "Kruskal's",
    function: createKruskalsMaze,
  },
  {
    name: "The Anti Maze",
    function: createMaze,
  },
];

export default MAZE_CREATORS;
