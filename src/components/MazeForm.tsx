import MazeFormValues from "../models/maze-form-values";
import { Button, Col, Form, Row, ToggleButton } from "react-bootstrap";
import { Field, useFormikContext } from "formik";
import MAZE_CREATORS from "../constants/maze-creators";
import { useState } from "react";
import Feedback from "react-bootstrap/esm/Feedback";

const sizeOptions = [1, 2, 3, 4, 5];

interface MazeFormProps {
  onExportClick: (values: MazeFormValues) => void;
}

const MazeForm = ({ onExportClick }: MazeFormProps) => {
  const [advancedOptionsHidden, setAdvancedOptionsHidden] =
    useState<boolean>(true);
  const { values, errors, handleSubmit, setFieldValue, getFieldProps } =
    useFormikContext<MazeFormValues>();

  const handleExportClick = () => onExportClick(values);

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <h4 className="mb-3">Options</h4>

      <Row className="mb-3">
        <Form.Group className="col">
          <Form.Label>Width</Form.Label>
          <Form.Control
            id="width"
            type="number"
            isInvalid={errors.width ? true : false}
            {...getFieldProps("width")}
          />
          <Feedback type="invalid">{errors.width}</Feedback>
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>Height</Form.Label>
          <Form.Control
            id="height"
            type="number"
            isInvalid={errors.height ? true : false}
            {...getFieldProps("height")}
          />
          <Feedback type="invalid">{errors.height}</Feedback>
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

      <Row>
        <div>
          <Button variant="primary" type="submit" className="me-3 mb-3">
            Generate Maze
          </Button>
          <ToggleButton
            id="toggle-check"
            className="mb-3"
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

      <Row>
        <div>
          <Button
            className="me-3 mb-3"
            variant="primary"
            onClick={handleExportClick}
          >
            Export to Data Pack
          </Button>
          <ToggleButton
            id="toggle-check"
            className="mb-3"
            type="checkbox"
            variant="outline-secondary"
            checked={!advancedOptionsHidden}
            value="1"
            onClick={() => setAdvancedOptionsHidden(!advancedOptionsHidden)}
          >
            {advancedOptionsHidden
              ? "Show Advanced Options"
              : "Hide Advanced Options"}
          </ToggleButton>
        </div>
      </Row>

      <Row>
        <div className="text-center my-5">
          Use the controls to generate a maze.
          <br />
          Large mazes may take some time to generate.
          <br />
          Created by{" "}
          <a href="https://www.nsdigirolamo.com">Nicholas DiGirolamo</a>
        </div>
      </Row>

      <Row hidden={advancedOptionsHidden}>
        <h4 className="mb-3">Advanced Options</h4>

        <Row className="mb-3">
          <Form.Group className="col">
            <Form.Label>Corridor Width</Form.Label>
            <Field
              className="form-select"
              name="corridorWidth"
              as="select"
              type="number"
            >
              {sizeOptions.map((element, index) => (
                <option value={element} key={index} label={"" + element} />
              ))}
            </Field>
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>Wall Width</Form.Label>
            <Field
              className="form-select"
              name="wallWidth"
              as="select"
              type="number"
            >
              {sizeOptions.map((element, index) => (
                <option value={element} key={index} label={"" + element} />
              ))}
            </Field>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col>
            Start Coordinate
            <Row>
              <Form.Group className="col">
                <Form.Label>Row</Form.Label>
                <Form.Control
                  id="startRow"
                  type="number"
                  isInvalid={errors.startRow ? true : false}
                  {...getFieldProps("startRow")}
                />
                <Feedback type="invalid">{errors.startRow}</Feedback>
              </Form.Group>
              <Form.Group className="col">
                <Form.Label>Column</Form.Label>
                <Form.Control
                  id="startColumn"
                  type="number"
                  isInvalid={errors.startColumn ? true : false}
                  {...getFieldProps("startColumn")}
                />
                <Feedback type="invalid">{errors.startColumn}</Feedback>
              </Form.Group>
            </Row>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            End Coordinate
            <Row>
              <Form.Group className="col">
                <Form.Label>Row</Form.Label>
                <Form.Control
                  id="endRow"
                  type="number"
                  isInvalid={errors.endRow ? true : false}
                  {...getFieldProps("endRow")}
                />
                <Feedback type="invalid">{errors.endRow}</Feedback>
              </Form.Group>
              <Form.Group className="col">
                <Form.Label>Column</Form.Label>
                <Form.Control
                  id="endColumn"
                  type="number"
                  isInvalid={errors.endColumn ? true : false}
                  {...getFieldProps("endColumn")}
                />
                <Feedback type="invalid">{errors.endColumn}</Feedback>
              </Form.Group>
            </Row>
          </Col>
        </Row>
      </Row>
    </Form>
  );
};

export default MazeForm;
