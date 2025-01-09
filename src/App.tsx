import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Visualizer from "./components/Visualizer";
import Maze from "./models/maze";
import MAZE_CREATORS from "./constants/maze-creators";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
  ToggleButton,
} from "react-bootstrap";
import DEFAULT_CONTROL_PANEL_DATA from "./constants/control-panel-data";
import { useFormik } from "formik";

function App() {
  const [maze, setMaze] = useState<Maze | null>();
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: DEFAULT_CONTROL_PANEL_DATA,
    onSubmit: (values) => {
      console.log(values);
      const mazeCreator = MAZE_CREATORS[values.mazeCreatorIndex].function;
      const newMaze: Maze = mazeCreator(values.width, values.height);
      setMaze(newMaze);
    },
  });

  return (
    <>
      <h1 className="text-center my-4">Minecraft Maze Generator</h1>
      <Container className="mx-4">
        <Row>
          <Col sm={4} style={{ height: "100%" }}>
            <Row>
              <Form onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Width</Form.Label>
                    <Form.Control
                      id="width"
                      type="number"
                      {...formik.getFieldProps("width")}
                      min={1}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Height</Form.Label>
                    <Form.Control
                      id="height"
                      type="number"
                      {...formik.getFieldProps("height")}
                      min={1}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>Algorithm</Form.Label>
                    <Form.Select
                      id="mazeCreatorIndex"
                      {...formik.getFieldProps("mazeCreatorIndex")}
                    >
                      {MAZE_CREATORS.map((element, index) => (
                        <option value={index} key={index}>
                          {element.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                  Generate Maze
                </Button>
                <ButtonGroup className="mx-3">
                  {maze ? (
                    <ToggleButton
                      id="toggle-check"
                      type="checkbox"
                      variant="outline-secondary"
                      checked={showSolution}
                      value="1"
                      onChange={(e) => setShowSolution(e.currentTarget.checked)}
                    >
                      {showSolution ? "Hide Solution" : "Show Solution"}
                    </ToggleButton>
                  ) : null}
                </ButtonGroup>
              </Form>
            </Row>
          </Col>
          <Col
            sm={8}
            className="d-flex"
            style={{ minHeight: "80vh" }}
            fluid={true}
          >
            {maze ? (
              <Visualizer maze={maze} showSolution={showSolution} />
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
    </>
  );
}

export default App;
