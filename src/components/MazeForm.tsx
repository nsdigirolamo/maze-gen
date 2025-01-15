import MazeFormValues from "../models/maze-form-values";
import { Button, Form, Row, ToggleButton } from "react-bootstrap";
import { Field, useFormikContext } from "formik";
import MAZE_CREATORS from "../constants/maze-creators";
import CoordinateInput from "./CoordinateInput";

const sizeOptions = [1, 2, 3, 4, 5];

interface MazeFormProps {
  onExportClick: (values: MazeFormValues) => void;
}

const MazeForm = ({ onExportClick }: MazeFormProps) => {
  const { values, handleSubmit, setFieldValue } =
    useFormikContext<MazeFormValues>();

  const handleExportClick = () => onExportClick(values);

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group className="col">
          <Form.Label>Width</Form.Label>
          <Field className="form-control" name="width" type="number" min={1} />
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>Height</Form.Label>
          <Field className="form-control" name="height" type="number" min={1} />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group className="col">
          <Form.Label>Algorithm</Form.Label>
          <Field className="form-select" name="mazeCreatorIndex" as="select">
            {MAZE_CREATORS.map((element, index) => (
              <option value={index} key={index} label={element.name} />
            ))}
          </Field>
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
          <Field className="form-select" name="corridorWidth" as="select">
            {sizeOptions.map((element, index) => (
              <option value={element} key={index} label={"" + element} />
            ))}
          </Field>
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>Wall Width</Form.Label>
          <Field className="form-select" name="wallWidth" as="select">
            {sizeOptions.map((element, index) => (
              <option value={element} key={index} label={"" + element} />
            ))}
          </Field>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <CoordinateInput
          label="Start Coordinate"
          name="start"
          maxRow={values.height - 1}
          maxColumn={values.width - 1}
        />
      </Row>
      <Row className="mb-3">
        <CoordinateInput
          label="End Coordinate"
          name="end"
          maxRow={values.height - 1}
          maxColumn={values.width - 1}
        />
      </Row>
      <Row className="mb-3">
        <div>
          <Button
            className="me-3"
            variant="primary"
            onClick={handleExportClick}
          >
            Export to Data Pack
          </Button>
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
