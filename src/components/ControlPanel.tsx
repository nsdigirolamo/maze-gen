import { ReactElement } from "react";
import ControlPanelData from "../models/control-panel-data";
import MAZE_CREATORS from "../constants/maze-creators";
import { Button, Col, Row, Form } from "react-bootstrap";
import { useFormik } from "formik";
import DEFAULT_CONTROL_PANEL_DATA from "../constants/control-panel-data";

interface ControlPanelProps {
  onSubmit: (data: ControlPanelData) => void;
}

function ControlPanel({ onSubmit }: ControlPanelProps): ReactElement {
  const formik = useFormik({
    initialValues: DEFAULT_CONTROL_PANEL_DATA,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Width</Form.Label>
          <Form.Control
            id="width"
            name="width"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.width}
            min={1}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Height</Form.Label>
          <Form.Control
            id="height"
            name="height"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.height}
            min={1}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Algorithm</Form.Label>
          <Form.Select
            id="mazeCreatorIndex"
            name="mazeCreatorIndex"
            onChange={formik.handleChange}
            value={formik.values.mazeCreatorIndex}
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
    </Form>
  );
}

export default ControlPanel;
