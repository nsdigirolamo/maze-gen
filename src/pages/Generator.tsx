import { Formik } from "formik";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import MazeForm from "../components/MazeForm";
import Visualizer from "../components/Visualizer";
import Maze from "../models/maze";
import MAZE_CREATORS from "../constants/maze-creators";
import MazeFormValues from "../models/maze-form-values";

const Generator = () => {
  const [maze, setMaze] = useState<Maze | null>();

  const initialValues: MazeFormValues = {
    width: 10,
    height: 10,
    mazeCreatorIndex: 0,
    showSolution: false,
    corridorWidth: 10,
    wallWidth: 10,
  };
  const onSubmit = (values: MazeFormValues) => {
    const creatorFunction = MAZE_CREATORS[values.mazeCreatorIndex].function;
    const newMaze = creatorFunction(values.width, values.height);
    setMaze(newMaze);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => {
        return (
          <Row>
            <Col>
              <MazeForm />
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
