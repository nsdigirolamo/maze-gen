import Coordinate from "./coordinate";

interface MazeFormValues {
  width: number;
  height: number;
  mazeCreatorIndex: number;
  showSolution: boolean;
  corridorWidth: number;
  wallWidth: number;
  start: Coordinate;
  end: Coordinate;
}

export default MazeFormValues;
