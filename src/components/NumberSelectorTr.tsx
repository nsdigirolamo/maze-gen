import { useEffect, useState } from "react";

interface NumberSelectorTrProps {
  label: string;
  initialValue: number;
  onChange: (newValue: number) => void;
  maxValue?: number;
  minValue?: number;
}

function NumberSelectorTr(props: NumberSelectorTrProps) {
  const max = props.maxValue ? props.maxValue : 1000;
  const min = props.minValue ? props.minValue : 1;

  const [value, setValue] = useState<number>(props.initialValue);
  const handleChange = (newValue: number) => {
    setValue(Math.min(Math.max(newValue, min), max - 1));
  };

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <tr>
      <td className="label">{props.label}</td>
      <td>
        <input
          type="number"
          onChange={(event) => handleChange(+event.target.value)}
          value={"" + value}
        />
        <span>{min} to {max - 1}</span>
      </td>
    </tr>
  );
}

export default NumberSelectorTr;
