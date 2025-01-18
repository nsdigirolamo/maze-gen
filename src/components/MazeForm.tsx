import { Button, Form, Row, ToggleButton } from "react-bootstrap";
import MAZE_CREATORS from "../constants/maze-creators";
import { MouseEventHandler, useState } from "react";
import Inputs from "../models/inputs";
import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";

interface MazeFormProps {
  onSubmit: SubmitHandler<Inputs>;
  onExport: MouseEventHandler<HTMLButtonElement>;
}

const MazeForm = ({ onSubmit, onExport }: MazeFormProps) => {
  const { getValues, setValue, register, handleSubmit } =
    useFormContext<Inputs>();
  const showSolution = useWatch<Inputs>({ name: "showSolution" });
  const [advancedOptionsHidden, setAdvancedOptionsHidden] =
    useState<boolean>(true);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <h4 className="mb-3">Options</h4>

        <Row className="mb-3">
          <Form.Group className="col">
            <Form.Label>Width</Form.Label>
            <Form.Control type="number" {...register("width", { min: 1 })} />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>Height</Form.Label>
            <Form.Control type="number" {...register("height", { min: 1 })} />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group className="col">
            <Form.Label>Algorithm</Form.Label>
            <Form.Select {...register("mazeCreatorIndex")}>
              {MAZE_CREATORS.map((element, index) => (
                <option value={index} key={index} label={element.name} />
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
          <div>
            <Button variant="primary" type="submit" className="me-3 mb-3">
              Generate Maze
            </Button>
            <ToggleButton
              id="showSolution"
              className="mb-3"
              type="checkbox"
              variant="outline-secondary"
              checked={getValues("showSolution")}
              value="1"
              onClick={() =>
                setValue("showSolution", !getValues("showSolution"))
              }
            >
              {showSolution ? "Hide Solution" : "Show Solution"}
            </ToggleButton>
          </div>
        </Row>

        <Row>
          <div>
            <Button className="me-3 mb-3" variant="primary" onClick={onExport}>
              Export to Data Pack
            </Button>
            <ToggleButton
              id="hideAdvancedOptions"
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
            <Form.Control
              type="number"
              {...register("corridorWidth", { min: 1 })}
            />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>Wall Width</Form.Label>
            <Form.Control
              type="number"
              {...register("wallWidth", { min: 1 })}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group className="col">
            <Form.Label>Start Row</Form.Label>
            <Form.Control
              type="number"
              {...register("startRow", {
                min: 0,
                max: getValues("height"),
              })}
            />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>Start Column</Form.Label>
            <Form.Control
              type="number"
              {...register("startColumn", {
                min: 0,
                max: getValues("width"),
              })}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group className="col">
            <Form.Label>End Row</Form.Label>
            <Form.Control
              type="number"
              {...register("endRow", { min: 0, max: getValues("height") })}
            />
          </Form.Group>
          <Form.Group className="col">
            <Form.Label>End Column</Form.Label>
            <Form.Control
              type="number"
              {...register("endColumn", {
                min: 0,
                max: getValues("width"),
              })}
            />
          </Form.Group>
        </Row>
      </Row>
    </Form>
  );
};

export default MazeForm;
