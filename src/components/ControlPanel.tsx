import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import ControlPanelData from "../models/control-panel-data";
import MAZE_CREATORS from "../constants/maze-creators";

interface ControlPanelProps {
  defaultData: ControlPanelData;
  maxWidth?: number;
  maxHeight?: number;
  onSubmit: (data: ControlPanelData) => void;
}

function ControlPanel({
  onSubmit,
  maxWidth,
  maxHeight,
  defaultData,
}: ControlPanelProps): ReactElement {
  maxWidth = maxWidth ? maxWidth : 500;
  maxHeight = maxHeight ? maxHeight : 500;
  const { register, handleSubmit } = useForm<ControlPanelData>({
    defaultValues: defaultData,
  });

  return (
    <form className="menu" onSubmit={handleSubmit((data) => onSubmit(data))}>
      <table>
        <tbody>
          <tr>
            <td>
              <label>Width</label>
            </td>
            <td>
              <input
                type="number"
                min={1}
                max={maxWidth}
                placeholder={1 + " - " + maxWidth}
                {...register("width", { valueAsNumber: true })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Height</label>
            </td>
            <td>
              <input
                type="number"
                min={1}
                max={maxHeight}
                placeholder={1 + " - " + maxHeight}
                {...register("height", { valueAsNumber: true })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Start</label>
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={maxHeight - 1}
                placeholder="Row"
                {...register("startRow", { valueAsNumber: true })}
              />
              <input
                type="number"
                min={0}
                max={maxWidth - 1}
                placeholder="Column"
                {...register("startColumn", { valueAsNumber: true })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>End</label>
            </td>
            <td>
              <input
                type="number"
                min={0}
                max={maxHeight - 1}
                placeholder="Row"
                {...register("endRow", { valueAsNumber: true })}
              />
              <input
                type="number"
                min={0}
                max={maxWidth - 1}
                placeholder="Column"
                {...register("endColumn", { valueAsNumber: true })}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Algorithm</label>
            </td>
            <td>
              <select
                {...register("mazeCreatorIndex", { valueAsNumber: true })}
              >
                {MAZE_CREATORS.map((element, index) => (
                  <option value={index} key={index}>
                    {element.name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="container" style={{ paddingTop: "25px" }}>
        <button type="submit">Generate Maze</button>
      </div>
    </form>
  );
}

export default ControlPanel;
