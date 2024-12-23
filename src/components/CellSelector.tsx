import { useEffect, useState } from "react";
import Coordinate from "../models/coordinate";

interface CoordinateSelectorProps {
  initialValue: Coordinate;
  onChange: (newCoordinate: Coordinate) => void;
  width: number;
  height: number;
  label: string;
}

function CellSelector(props: CoordinateSelectorProps) {
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
    <div className="cell-selector">
      <div className="row">
        <div className="col">{props.label}</div>
        <div className="col">
          <div className="row">
            <div className="col input-label">Row:</div>
            <div className="col">
              <input
                type="number"
                onChange={(event) =>
                  handleStart(+event.target.value, coordinate.col)
                }
                value={"" + coordinate.row}
              />
            </div>
          </div>
          <div className="row">
            <div className="col input-label">Column:</div>
            <div className="col">
              <input
                type="number"
                onChange={(event) =>
                  handleStart(coordinate.row, +event.target.value)
                }
                value={"" + coordinate.col}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CellSelector;
