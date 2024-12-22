import { Maze } from "./components/Maze";

function App() {
  return (
    <>
      <Maze width={Math.floor(window.innerHeight)} />
    </>
  );
}

export default App;
