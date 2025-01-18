import { create, Selection } from "d3";
import { area, line } from "d3-shape";
import Coordinate from "../models/coordinate";
import Maze from "../models/maze";

export function createCorridorsSelection(
  maze: Maze,
  corridorWidth: number,
  wallWidth: number,
  fill: string,
) {
  let filledAreaSelection = create("svg:g");

  maze.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      const x = (1 + colIndex) * wallWidth + colIndex * corridorWidth;
      const y = (1 + rowIndex) * wallWidth + rowIndex * corridorWidth;

      filledAreaSelection.append(() =>
        createFilledAreaSelection(
          [x, y],
          corridorWidth,
          corridorWidth,
          fill,
        ).node(),
      );

      if (!cell.walls.top) {
        const wallX = x;
        const wallY = y - wallWidth;
        filledAreaSelection.append(() =>
          createFilledAreaSelection(
            [wallX, wallY],
            corridorWidth,
            wallWidth,
            fill,
          ).node(),
        );
      }
      if (!cell.walls.bottom) {
        const wallX = x;
        const wallY = y + corridorWidth;
        filledAreaSelection.append(() =>
          createFilledAreaSelection(
            [wallX, wallY],
            corridorWidth,
            wallWidth,
            fill,
          ).node(),
        );
      }
      if (!cell.walls.left) {
        const wallX = x - wallWidth;
        const wallY = y;
        filledAreaSelection.append(() =>
          createFilledAreaSelection(
            [wallX, wallY],
            wallWidth,
            corridorWidth,
            fill,
          ).node(),
        );
      }
      if (!cell.walls.right) {
        const wallX = x + corridorWidth;
        const wallY = y;
        filledAreaSelection.append(() =>
          createFilledAreaSelection(
            [wallX, wallY],
            wallWidth,
            corridorWidth,
            fill,
          ).node(),
        );
      }
    }),
  );

  return filledAreaSelection;
}

export function createSolutionSelection(
  solution: Coordinate[],
  corridorWidth: number,
  wallWidth: number,
): Selection<Element, undefined, null, undefined> {
  const points: Coordinate[] = solution.map((coordinate) => {
    const x =
      (1 + coordinate[1]) * wallWidth +
      coordinate[1] * corridorWidth +
      corridorWidth / 2.0;
    const y =
      (1 + coordinate[0]) * wallWidth +
      coordinate[0] * corridorWidth +
      corridorWidth / 2.0;
    return [x, y];
  });

  return createLineSelection(points);
}

export function createFilledAreaSelection(
  coordinate: Coordinate,
  width: number,
  height: number,
  fill: string,
): Selection<Element, Coordinate[], null, undefined> {
  const points: Coordinate[] = [
    coordinate,
    [coordinate[0] + width, coordinate[1]],
    [coordinate[0] + width, coordinate[1] + height],
    [coordinate[0], coordinate[1] + height],
  ];

  return create("svg:path").datum(points).attr("d", area()).attr("fill", fill);
}

export function createLineSelection(
  path: Coordinate[],
): Selection<Element, undefined, null, undefined> {
  const lineGenerator = line();
  const pathData = lineGenerator(path);
  return create("svg:path")
    .attr("d", pathData)
    .attr("fill", "none")
    .attr("stroke", "red")
    .attr("stroke-width", 3);
}
