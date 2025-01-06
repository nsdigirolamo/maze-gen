import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import ControlPanelData from "../models/control-panel-data";
import MAZE_CREATORS from "../constants/maze-creators";

interface ControlPanelProps {
  defaultData: ControlPanelData;
  onSubmit: (data: ControlPanelData) => void;
}

function ControlPanel({
  onSubmit,
  defaultData,
}: ControlPanelProps): ReactElement {
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
              <input type="number" min={1} {...register("width")} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Height</label>
            </td>
            <td>
              <input type="number" min={1} {...register("height")} />
            </td>
          </tr>
          <tr>
            <td>
              <label>Algorithm</label>
            </td>
            <td>
              <select {...register("mazeCreatorIndex")}>
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
