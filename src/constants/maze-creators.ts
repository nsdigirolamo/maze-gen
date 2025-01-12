import { createIterativeBacktrackingMaze } from "../logic/iterativeBacktracking";
import { createKruskalsMaze } from "../logic/kruskals";

const MAZE_CREATORS = [
  {
    name: "Backtracking",
    function: createIterativeBacktrackingMaze,
  },
  {
    name: "Kruskal's",
    function: createKruskalsMaze,
  },
];

export default MAZE_CREATORS;
