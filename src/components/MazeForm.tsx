import { ReactElement } from "react";
import MazeFormValues from "../models/maze-form-values";
import { Button, Form, Row, ToggleButton } from "react-bootstrap";
import { useFormik } from "formik";
import MAZE_CREATORS from "../constants/maze-creators";

interface MazeFormProps {
  onSubmit: (values: MazeFormValues) => void;
  onCorridorWidthChange: (value: number) => void;
  onWallWidthChange: (value: number) => void;
  onShowSolution: (value: boolean) => void;
}

const sizeOptions = [10, 20, 30, 40, 50];

function MazeForm({
  onSubmit,
  onCorridorWidthChange,
  onWallWidthChange,
  onShowSolution,
}: MazeFormProps): ReactElement {
  const formik = useFormik({
    initialValues: {
      width: 10,
      height: 10,
      mazeCreatorIndex: 0,
      showSolution: false,
      corridorWidth: 10,
      wallWidth: 10,
    },
    onSubmit,
  });

  const handleShowSolutionClick = () => {
    const newShowSolution = !formik.values.showSolution;
    formik.setFieldValue("showSolution", newShowSolution);
    onShowSolution(newShowSolution);
  };

  const handleCorridorWidthChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newCorridorWidth = +event.target.value;
    formik.setFieldValue("corridorWidth", newCorridorWidth);
    onCorridorWidthChange(newCorridorWidth);
  };

  const handleWallWidthChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newWallWidth = +event.target.value;
    formik.setFieldValue("wallWidth", newWallWidth);
    onWallWidthChange(newWallWidth);
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
          Large mazes may take a few minutes to generate and solve.
        </div>
      </Row>
      <Row className="mb-3">
        <Form.Group className="col">
          <Form.Label>Corridor Width</Form.Label>
          <Form.Select
            id="corridorWidth"
            name="corridorWidth"
            value={formik.values.corridorWidth}
            onChange={handleCorridorWidthChange}
            onBlur={formik.handleBlur}
          >
            {sizeOptions.map((element, index) => (
              <option value={element} key={index} label={"" + element / 10} />
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>Wall Width</Form.Label>
          <Form.Select
            id="wallWidth"
            name="wallWidth"
            value={formik.values.wallWidth}
            onChange={handleWallWidthChange}
            onBlur={formik.handleBlur}
          >
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
            checked={formik.values.showSolution}
            value="1"
            onClick={handleShowSolutionClick}
          >
            {formik.values.showSolution ? "Hide Solution" : "Show Solution"}
          </ToggleButton>
        </div>
      </Row>
    </Form>
  );
}

export default MazeForm;
