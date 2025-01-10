import { ReactElement, useState } from "react";
import MazeFormValues from "../models/control-panel-data";
import { Button, Form, Row, ToggleButton } from "react-bootstrap";
import { useFormik } from "formik";
import MAZE_CREATORS from "../constants/maze-creators";

interface MazeFormProps {
  onSubmit: (values: MazeFormValues) => void;
  onShowSolution: (value: boolean) => void;
}

function MazeForm({ onSubmit, onShowSolution }: MazeFormProps): ReactElement {
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      width: 10,
      height: 10,
      mazeCreatorIndex: 0,
      showSolution: false,
    },
    onSubmit,
  });

  const handleShowSolutionClick = () => {
    const newShowSolution = !showSolution;
    setShowSolution(newShowSolution);
    onShowSolution(newShowSolution);
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row className="mb-3">
        <Form.Group className="col">
          <Form.Label>Width</Form.Label>
          <Form.Control
            id="width"
            type="number"
            {...formik.getFieldProps("width")}
            min={1}
          />
        </Form.Group>
        <Form.Group className="col">
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
        <Form.Group className="col">
          <Form.Label>Algorithm</Form.Label>
          <Form.Select
            id="mazeCreatorIndex"
            {...formik.getFieldProps("mazeCreatorIndex")}
          >
            {MAZE_CREATORS.map((element, index) => (
              <option value={index} key={index} label={element.name} />
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        Generate Maze
      </Button>
      <ToggleButton
        id="toggle-check"
        className="mx-3"
        type="checkbox"
        variant="outline-secondary"
        checked={showSolution}
        value="1"
        onClick={handleShowSolutionClick}
      >
        {formik.values.showSolution ? "Hide Solution" : "Show Solution"}
      </ToggleButton>
    </Form>
  );
}

export default MazeForm;
