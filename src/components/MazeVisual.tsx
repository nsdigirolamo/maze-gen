import { useEffect, useRef } from "react";
import Maze from "../models/maze";
import { select } from "d3";
import {
  createCorridorsSelection,
  createFilledAreaSelection,
} from "../logic/visualizer";

interface MazeVisualProps {
  maze: Maze;
  width: number;
  height: number;
  corridorWidth: number;
  wallWidth: number;
}

function MazeVisual({
  maze,
  width,
  height,
  corridorWidth,
  wallWidth,
}: MazeVisualProps) {
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const g = gRef.current;
    if (g === null) return;
    select(g).selectChildren().remove();
    select(g).append(() =>
      createFilledAreaSelection([0, 0], width, height, "black").node(),
    );
    select(g).append(() =>
      createCorridorsSelection(maze, corridorWidth, wallWidth, "white").node(),
    );
  }, [maze, width, height, corridorWidth, wallWidth]);

  return <g ref={gRef} />;
}

export default MazeVisual;
