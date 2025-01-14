import { Formik, FormikProps } from "formik";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import MazeForm from "../components/MazeForm";
import Visualizer from "../components/Visualizer";
import Maze from "../models/maze";
import MAZE_CREATORS from "../constants/maze-creators";
import MazeFormValues from "../models/maze-form-values";
import { mazeToBlocks } from "../logic/maze";
import { createDatapack, mazeToMcFunction } from "../logic/mcFunction";

const Generator = () => {
  const [maze, setMaze] = useState<Maze | null>(null);

  const initialValues: MazeFormValues = {
    width: 10,
    height: 10,
    mazeCreatorIndex: 0,
    showSolution: false,
    corridorWidth: 1,
    wallWidth: 1,
  };

  const handleSubmit = (values: MazeFormValues) => {
    const creatorFunction = MAZE_CREATORS[values.mazeCreatorIndex].function;
    const newMaze = creatorFunction(values.width, values.height);
    setMaze(newMaze);
  };

  const handleExport = (formik: FormikProps<MazeFormValues>) => {
    if (maze === null) return;
    const blocks = mazeToBlocks(
      maze,
      +formik.values.corridorWidth,
      +formik.values.wallWidth,
    );
    const mazeFunction = mazeToMcFunction(blocks);
    createDatapack(mazeFunction, "").then((datapack) => {
      const url = window.URL.createObjectURL(datapack);
      const link = document.createElement("a");
      link.href = url;
      link.download = "mazes.zip";
      link.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik: FormikProps<MazeFormValues>) => {
        return (
          <Row>
            <Col>
              <MazeForm onExportClick={() => handleExport(formik)} />
            </Col>
            <Col sm={8}>
              {maze ? (
                <Visualizer
                  maze={maze}
                  cellWidth={formik.values.corridorWidth * 10}
                  wallWidth={formik.values.wallWidth * 10}
                  showSolution={formik.values.showSolution}
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
