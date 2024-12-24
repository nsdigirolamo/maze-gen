import { useEffect, useState } from "react";
import Coordinate from "../models/coordinate";

interface CoordinateSelectorTrProps {
  label: string;
  initialValue: Coordinate;
  onChange: (newValue: Coordinate) => void;
  maxRowValue: number;
  maxColValue: number;
}

function CoordinateSelectorTr(props: CoordinateSelectorTrProps) {
  const [coordinate, setCoordinate] = useState<Coordinate>(props.initialValue);
  const handleChange = (newRow: number, newCol: number) => {
    setCoordinate({
      row: Math.min(Math.max(newRow, 0), props.maxRowValue - 1),
      col: Math.min(Math.max(newCol, 0), props.maxColValue - 1),
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
          onChange={(event) =>
            handleChange(+event.target.value, coordinate.col)
          }
          value={"" + coordinate.row}
        />
        <span>Column: </span>
        <input
          type="number"
          onChange={(event) =>
            handleChange(coordinate.row, +event.target.value)
          }
          value={"" + coordinate.col}
        />
      </td>
    </tr>
  );
}

export default CoordinateSelectorTr;
