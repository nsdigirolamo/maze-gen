import { useEffect, useRef } from "react";
import Maze from "../models/maze";
import { select } from "d3";
import { createSolutionSelection } from "../logic/visualizer";
import { solveMaze } from "../logic/maze";
import Coordinate from "../models/coordinate";

interface SolutionVisualProps {
  maze: Maze;
  start: Coordinate;
  end: Coordinate;
  corridorWidth: number;
  wallWidth: number;
  isDisplayed: boolean;
}

function SolutionVisual({
  maze,
  start,
  end,
  corridorWidth,
  wallWidth,
  isDisplayed,
}: SolutionVisualProps) {
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const g = gRef.current;
    if (g === null) return;
    select(g).selectChildren().remove();
    const solution = solveMaze(maze, start, end);
    select(g).append(() =>
      createSolutionSelection(solution, corridorWidth, wallWidth).node(),
    );
  }, [maze, start, end, corridorWidth, wallWidth]);

  return <g style={{ display: isDisplayed ? undefined : "none" }} ref={gRef} />;
}

export default SolutionVisual;
