import { useEffect, useState } from "react";
import Coordinate from "../models/coordinate";

interface CoordinateSelectorTrProps {
  initialValue: Coordinate;
  onChange: (newCoordinate: Coordinate) => void;
  width: number;
  height: number;
  label: string;
}

function CoordinateSelectorTr(props: CoordinateSelectorTrProps) {
  const [coordinate, setCoordinate] = useState<Coordinate>(props.initialValue);
  const handleStart = (newRow: number, newCol: number) => {
    setCoordinate({
      row: Math.min(Math.max(newRow, 0), props.height - 1),
      col: Math.min(Math.max(newCol, 0), props.width - 1),
    });
  };

  useEffect(() => {
    props.onChange(coordinate);
  }, [coordinate]);

  return (
    <tr>
      <td className="label">{props.label}</td>
      <td>
        <span>Row: </span>
        <input
          type="number"
          onChange={(event) => handleStart(+event.target.value, coordinate.col)}
          value={"" + coordinate.row}
        />
        <span>Column: </span>
        <input
          type="number"
          onChange={(event) => handleStart(coordinate.row, +event.target.value)}
          value={"" + coordinate.col}
        />
      </td>
    </tr>
  );
}

export default CoordinateSelectorTr;
