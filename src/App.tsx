import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Visualizer from "./components/Visualizer";
import ControlPanel from "./components/ControlPanel";
import Maze from "./models/maze";
import MAZE_CREATORS from "./constants/maze-creators";
import ControlPanelData from "./models/control-panel-data";
import { Col, Container, Row } from "react-bootstrap";

function App() {
  const [maze, setMaze] = useState<Maze | null>();
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const handleControlPanelSubmit = (data: ControlPanelData) => {
    console.log(data);
    const mazeCreator = MAZE_CREATORS[data.mazeCreatorIndex].function;
    const newMaze: Maze = mazeCreator(data.width, data.height);
    setMaze(newMaze);
  };

  const handleShowSolutionToggle = () => {
    setShowSolution(!showSolution);
  };

  return (
    <>
      <h1 className="text-center my-4">Minecraft Maze Generator</h1>
      <Container style={{ minHeight: "100vh" }}>
        <Row className="mb-5">
          <Col md={{ span: 6, offset: 3 }}>
            <ControlPanel onSubmit={handleControlPanelSubmit} />
          </Col>
        </Row>
        <Row className="mb-5">
          <Col className="text-center">
            {maze ? (
              <>
                <Row>
                  <Col>
                    <span>Show Solution?</span>
                    <input
                      className="mx-2"
                      type="checkbox"
                      onChange={handleShowSolutionToggle}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Visualizer maze={maze} showSolution={showSolution} />
                  </Col>
                </Row>
              </>
            ) : (
              <>
                Use the controls above to generate a maze.
                <br />
                Large mazes may take a few minutes to generate and solve.
              </>
            )}
          </Col>
        </Row>
      </Container>
      <footer className="text-center text-muted mx-auto my-4">
        Copyright © 2025 -{" "}
        <a href="https://nsdigirolamo.com">Nicholas DiGirolamo</a>
      </footer>
    </>
  );
}

export default App;
