import Coordinate from "../models/coordinate";

interface CoordinateVisualProps {
  corridorWidth: number;
  wallWidth: number;
  coordinate: Coordinate;
  fill: string;
}

function CoordinateVisual({
  corridorWidth,
  wallWidth,
  coordinate,
  fill,
}: CoordinateVisualProps) {
  const x =
    (1 + coordinate[1]) * wallWidth +
    coordinate[1] * corridorWidth +
    corridorWidth / 2.0;
  const y =
    (1 + coordinate[0]) * wallWidth +
    coordinate[0] * corridorWidth +
    corridorWidth / 2.0;

  return <circle r={corridorWidth / 3.0} cx={x} cy={y} fill={fill} />;
}

export default CoordinateVisual;
