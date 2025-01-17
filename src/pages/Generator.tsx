import { Formik, FormikErrors, FormikHelpers, FormikProps } from "formik";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import MazeForm from "../components/MazeForm";
import Visualizer from "../components/Visualizer";
import Maze from "../models/maze";
import MAZE_CREATORS from "../constants/maze-creators";
import MazeFormValues from "../models/maze-form-values";
import { mazeToBlocks, solutionToBlocks, solveMaze } from "../logic/maze";
import {
  createDatapack,
  mazeToMcFunction,
  solutionToMcFunction,
} from "../logic/mcFunction";
import Coordinate from "../models/coordinate";

const initialValues: MazeFormValues = {
  width: 10,
  height: 10,
  mazeCreatorIndex: 0,
  showSolution: false,
  corridorWidth: 1,
  wallWidth: 1,
  startRow: 0,
  startColumn: 0,
  endRow: 9,
  endColumn: 9,
};

const Generator = () => {
  const [maze, setMaze] = useState<Maze | null>(null);

  const handleSubmit = (
    values: MazeFormValues,
    helpers: FormikHelpers<MazeFormValues>,
  ) => {
    const creatorFunction = MAZE_CREATORS[values.mazeCreatorIndex].function;
    const newMaze = creatorFunction(values.width, values.height);
    setMaze(newMaze);
    helpers.setFieldValue("start", [0, 0] as Coordinate);
    helpers.setFieldValue("end", [
      values.height - 1,
      values.width - 1,
    ] as Coordinate);
  };

  const handleExport = (values: MazeFormValues) => {
    if (maze === null) return;

    const mazeBlocks = mazeToBlocks(
      maze,
      values.corridorWidth,
      values.wallWidth,
    );
    const mazeFunction = mazeToMcFunction(mazeBlocks);

    const start: Coordinate = [values.startRow, values.startColumn];
    const end: Coordinate = [values.endRow, values.endColumn];
    const solution = solveMaze(maze, start, end);
    const solutionBlocks = solutionToBlocks(
      maze,
      solution,
      values.corridorWidth,
      values.wallWidth,
    );
    const solutionFunction = solutionToMcFunction(solutionBlocks);

    createDatapack(mazeFunction, solutionFunction).then((datapack) => {
      const url = window.URL.createObjectURL(datapack);
      const link = document.createElement("a");
      link.href = url;
      link.download = "mazes.zip";
      link.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={doValidate}
    >
      {(formik: FormikProps<MazeFormValues>) => {
        return (
          <Container fluid>
            <Row>
              <Col lg={3}>
                <MazeForm onExportClick={handleExport} />
              </Col>
              <Col lg={9} className="d-flex my-auto">
                <Row className="mx-auto">
                  {maze ? (
                    <Visualizer
                      maze={maze}
                      showSolution={formik.values.showSolution}
                      corridorWidth={formik.values.corridorWidth * 10}
                      wallWidth={formik.values.wallWidth * 10}
                      start={[
                        formik.values.startRow,
                        formik.values.startColumn,
                      ]}
                      end={[formik.values.endRow, formik.values.endColumn]}
                    />
                  ) : null}
                </Row>
              </Col>
            </Row>
          </Container>
        );
      }}
    </Formik>
  );
};

function doValidate(values: MazeFormValues) {
  const errors: FormikErrors<MazeFormValues> = {};

  // width
  if (typeof values.width !== "number") {
    errors.width = "Must be a number";
  } else if (values.width <= 0) {
    errors.width = "Must be at least 1";
  }

  // height
  if (typeof values.height !== "number") {
    errors.height = "Must be a number";
  } else if (values.height <= 0) {
    errors.height = "Must be at least 1";
  }

  // mazeCreatorIndex
  if (typeof values.mazeCreatorIndex !== "number") {
    errors.mazeCreatorIndex = "Must be a number";
  } else if (
    values.mazeCreatorIndex < 0 ||
    MAZE_CREATORS.length <= values.mazeCreatorIndex
  ) {
    errors.mazeCreatorIndex = "Please choose a valid algorithm";
  }

  // corridorWidth
  if (typeof values.corridorWidth !== "number") {
    values.corridorWidth = +values.corridorWidth;
  }

  // wallWidth
  if (typeof values.wallWidth !== "number") {
    values.wallWidth = +values.wallWidth;
  }

  // startRow
  if (typeof values.startRow !== "number") {
    errors.startRow = "Must be a number";
  } else if (values.startRow < 0 || values.height <= values.startRow) {
    errors.startRow = `Must be between 0 and ${values.height - 1}`;
  }

  // startColumn
  if (typeof values.startColumn !== "number") {
    errors.startColumn = "Must be a number";
  } else if (values.startColumn < 0 || values.width <= values.startColumn) {
    errors.startColumn = `Must be between 0 and ${values.width - 1}`;
  }

  // endRow
  if (typeof values.endRow !== "number") {
    errors.endRow = "Must be a number";
  } else if (values.endRow < 0 || values.height <= values.endRow) {
    errors.endRow = `Must be between 0 and ${values.height - 1}`;
  }

  // endColumn
  if (typeof values.endColumn !== "number") {
    errors.endColumn = "Must be a number";
  } else if (values.endColumn < 0 || values.width <= values.endColumn) {
    errors.endColumn = `Must be between 0 and ${values.width - 1}`;
  }

  console.log(errors);

  return errors;
}

export default Generator;
