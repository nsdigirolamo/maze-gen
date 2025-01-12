import MazeFormValues from "../models/maze-form-values";
import { Button, Form, Row, ToggleButton } from "react-bootstrap";
import { useFormikContext } from "formik";
import MAZE_CREATORS from "../constants/maze-creators";

const sizeOptions = [10, 20, 30, 40, 50];

const MazeForm = () => {
  const { values, handleSubmit, getFieldProps, setFieldValue } =
    useFormikContext<MazeFormValues>();

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group className="col">
          <Form.Label>Width</Form.Label>
          <Form.Control
            id="width"
            type="number"
            {...getFieldProps("width")}
            min={1}
          />
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>Height</Form.Label>
          <Form.Control
            id="height"
            type="number"
            {...getFieldProps("height")}
            min={1}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group className="col">
          <Form.Label>Algorithm</Form.Label>
          <Form.Select
            id="mazeCreatorIndex"
            {...getFieldProps("mazeCreatorIndex")}
          >
            {MAZE_CREATORS.map((element, index) => (
              <option value={index} key={index} label={element.name} />
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <div>
          <Button variant="primary" type="submit">
            Generate Maze
          </Button>
        </div>
      </Row>
      <Row>
        <div className="text-center my-5">
          Use the controls above and below to generate the maze.
          <br />
          Large mazes may take some time to generate.
        </div>
      </Row>
      <Row className="mb-3">
        <Form.Group className="col">
          <Form.Label>Corridor Width</Form.Label>
          <Form.Select id="corridorWidth" {...getFieldProps("corridorWidth")}>
            {sizeOptions.map((element, index) => (
              <option value={element} key={index} label={"" + element / 10} />
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>Wall Width</Form.Label>
          <Form.Select id="wallWidth" {...getFieldProps("wallWidth")}>
            {sizeOptions.map((element, index) => (
              <option value={element} key={index} label={"" + element / 10} />
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <div>
          <ToggleButton
            id="toggle-check"
            type="checkbox"
            variant="outline-secondary"
            checked={values.showSolution}
            value="1"
            onClick={() => setFieldValue("showSolution", !values.showSolution)}
          >
            {values.showSolution ? "Hide Solution" : "Show Solution"}
          </ToggleButton>
        </div>
      </Row>
    </Form>
  );
};

export default MazeForm;
