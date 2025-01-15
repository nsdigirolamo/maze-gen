import { Formik, FormikProps } from "formik";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
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

const Generator = () => {
  const [maze, setMaze] = useState<Maze | null>(null);

  const initialValues: MazeFormValues = {
    width: 10,
    height: 10,
    mazeCreatorIndex: 0,
    showSolution: false,
    corridorWidth: 1,
    wallWidth: 1,
    start: { row: 0, col: 0 },
    end: { row: 9, col: 9 },
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, helpers) => {
        const creatorFunction = MAZE_CREATORS[values.mazeCreatorIndex].function;
        const newMaze = creatorFunction(values.width, values.height);
        setMaze(newMaze);
        helpers.setFieldValue("start", { row: 0, col: 0 });
        helpers.setFieldValue("end", {
          row: values.height - 1,
          col: values.width - 1,
        });
      }}
    >
      {(formik: FormikProps<MazeFormValues>) => {
        return (
          <Row>
            <Col>
              <MazeForm
                onExportClick={(values: MazeFormValues) => {
                  if (maze === null) return;

                  // TODO: corridorWidth and wallWidth are strings when
                  // the user selects them to be non-default values. Need to
                  // find a better solution than using '+' to convert them back
                  // to numbers.
                  const mazeBlocks = mazeToBlocks(
                    maze,
                    +values.corridorWidth,
                    +values.wallWidth,
                  );
                  const mazeFunction = mazeToMcFunction(mazeBlocks);

                  const solution = solveMaze(maze, values.start, values.end);
                  const solutionBlocks = solutionToBlocks(
                    maze,
                    solution,
                    +values.corridorWidth,
                    +values.wallWidth,
                  );
                  const solutionFunction = solutionToMcFunction(solutionBlocks);

                  createDatapack(mazeFunction, solutionFunction).then(
                    (datapack) => {
                      const url = window.URL.createObjectURL(datapack);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = "mazes.zip";
                      link.click();
                      window.URL.revokeObjectURL(url);
                    },
                  );
                }}
              />
            </Col>
            <Col sm={8}>
              {maze ? (
                <Visualizer
                  maze={maze}
                  cellWidth={formik.values.corridorWidth * 10}
                  wallWidth={formik.values.wallWidth * 10}
                  showSolution={formik.values.showSolution}
                  start={formik.values.start}
                  end={formik.values.end}
                />
              ) : null}
            </Col>
          </Row>
        );
      }}
    </Formik>
  );
};

export default Generator;
