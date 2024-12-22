import { Maze } from "./components/Maze";
import { createIterativeBacktrackingMaze } from "./logic/iterativeBacktracking";

function App() {
  const maze = createIterativeBacktrackingMaze(100, 100, { row: 0, col: 0 });

  return (
    <>
      <h1>Maze Generator</h1>
      <Maze width={Math.floor(window.innerHeight)} maze={maze} />
    </>
  );
}

export default App;
