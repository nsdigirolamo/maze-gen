export interface Cell {
  walls: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
}

export function createCell(): Cell {
  return {
    walls: {
      top: true,
      bottom: true,
      left: true,
      right: true,
    },
  };
}
