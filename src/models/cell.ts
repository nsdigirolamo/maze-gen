interface Cell {
  walls: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
}

export default Cell;
