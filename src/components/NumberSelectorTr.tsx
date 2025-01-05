import { ChangeEventHandler, ReactElement, useState } from "react";

interface NumberSelectorTrProps {
  label: string;
  initialValue: number;
  onChange: (newValue: number) => void;
}

const min = 1;
const max = 1000;

function NumberSelectorTr({
  label,
  initialValue,
  onChange,
}: NumberSelectorTrProps): ReactElement {
  const [value, setValue] = useState<number>(initialValue);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = Math.min(Math.max(+event.target.value, min), max);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <tr>
      <td className="label">{label}</td>
      <td>
        <input type="number" onChange={handleChange} value={"" + value} />
        <span>
          {min} to {max}
        </span>
      </td>
    </tr>
  );
}

export default NumberSelectorTr;
