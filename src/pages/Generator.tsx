import { Formik } from "formik";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import MazeForm from "../components/MazeForm";
import Visualizer from "../components/Visualizer";
import Maze from "../models/maze";
import MAZE_CREATORS from "../constants/maze-creators";
import MazeFormValues from "../models/maze-form-values";
import { exportToMcFunction } from "../logic/mcFunction";

const Generator = () => {
  const [maze, setMaze] = useState<Maze | null>(null);

  const initialValues: MazeFormValues = {
    width: 10,
    height: 10,
    mazeCreatorIndex: 0,
    showSolution: false,
    corridorWidth: 10,
    wallWidth: 10,
  };

  const handleSubmit = (values: MazeFormValues) => {
    const creatorFunction = MAZE_CREATORS[values.mazeCreatorIndex].function;
    const newMaze = creatorFunction(values.width, values.height);
    setMaze(newMaze);
  };

  const handleExport = () => {
    if (maze !== null) exportToMcFunction(maze);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => {
        return (
          <Row>
            <Col>
              <MazeForm onExportClick={handleExport} />
            </Col>
            <Col sm={8}>
              {maze ? (
                <Visualizer
                  maze={maze}
                  cellWidth={formik.values.corridorWidth}
                  wallWidth={formik.values.wallWidth}
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
