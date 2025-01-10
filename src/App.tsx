import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Visualizer from "./components/Visualizer";
import Maze from "./models/maze";
import MAZE_CREATORS from "./constants/maze-creators";
import { Col, Container, Row } from "react-bootstrap";
import MazeForm from "./components/MazeForm";
import MazeFormValues from "./models/maze-form-values";

function App() {
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [maze, setMaze] = useState<Maze | null>();

  const onMazeFormSubmit = (values: MazeFormValues) => {
    const creatorFunction = MAZE_CREATORS[values.mazeCreatorIndex].function;
    const newMaze = creatorFunction(values.width, values.height);
    setMaze(newMaze);
  };

  return (
    <>
      <h1 className="text-center my-4">Minecraft Maze Generator</h1>
      <Container className="mx-4">
        <Row>
          <Col>
            <MazeForm
              onSubmit={onMazeFormSubmit}
              onShowSolution={setShowSolution}
            />
            <div className="text-center my-5">
              Use the controls above to generate a maze.
              <br />
              Large mazes may take a few minutes to generate and solve.
            </div>
          </Col>
          <Col sm={8}>
            {maze ? (
              <Visualizer maze={maze} showSolution={showSolution} />
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
