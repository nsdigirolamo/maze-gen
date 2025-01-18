import { MouseEventHandler, useState } from "react";
import { Row, Col } from "react-bootstrap";
import MazeForm from "../components/MazeForm";
import Visualizer from "../components/Visualizer";
import Maze from "../models/maze";
import MAZE_CREATORS from "../constants/maze-creators";
import { mazeToBlocks, solutionToBlocks, solveMaze } from "../logic/maze";
import {
  createDatapack,
  mazeToMcFunction,
  solutionToMcFunction,
} from "../logic/mcFunction";
import Coordinate from "../models/coordinate";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import Inputs from "../models/inputs";

const defaultInputs: Inputs = {
  width: "10",
  height: "10",
  mazeCreatorIndex: "0",
  showSolution: false,
  corridorWidth: "1",
  wallWidth: "1",
  startRow: "0",
  startColumn: "0",
  endRow: "9",
  endColumn: "9",
};

const Generator = () => {
  const [maze, setMaze] = useState<Maze | null>(null);
  const formMethods = useForm<Inputs>({ defaultValues: defaultInputs });

  const handleSubmit: SubmitHandler<Inputs> = (inputs) => {
    const mazeCreatorIndex = +inputs.mazeCreatorIndex;
    const width = +inputs.width;
    const height = +inputs.height;

    const creatorFunction = MAZE_CREATORS[mazeCreatorIndex].function;
    const newMaze = creatorFunction(width, height);
    setMaze(newMaze);
    formMethods.setValue("startRow", "0");
    formMethods.setValue("startColumn", "0");
    formMethods.setValue("endRow", "" + (height - 1));
    formMethods.setValue("endColumn", "" + (width - 1));
  };

  const handleExport: MouseEventHandler<HTMLButtonElement> = () => {
    if (maze === null) return;

    const inputs = formMethods.getValues();
    const corridorWidth = +inputs.corridorWidth;
    const wallWidth = +inputs.wallWidth;
    const start: Coordinate = [+inputs.startRow, +inputs.startColumn];
    const end: Coordinate = [+inputs.endRow, +inputs.endColumn];

    const mazeBlocks = mazeToBlocks(maze, corridorWidth, wallWidth);
    const mazeFunction = mazeToMcFunction(mazeBlocks);

    const solution = solveMaze(maze, start, end);
    const solutionBlocks = solutionToBlocks(
      maze,
      solution,
      corridorWidth,
      wallWidth,
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
    <FormProvider {...formMethods}>
      <Row>
        <Col>
          <MazeForm onSubmit={handleSubmit} onExport={handleExport} />
        </Col>
        <Col sm={8}>{maze ? <Visualizer maze={maze} /> : null}</Col>
      </Row>
    </FormProvider>
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
