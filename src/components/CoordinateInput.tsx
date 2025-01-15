import { Col, Form, Row } from "react-bootstrap";
import Coordinate from "../models/coordinate";
import MazeFormValues from "../models/maze-form-values";
import { useFormikContext } from "formik";

interface CoordinateInputProps {
  label: string;
  name: "start" | "end";
  maxRow: number;
  maxColumn: number;
}

const CoordinateInput = ({
  label,
  name,
  maxRow,
  maxColumn,
}: CoordinateInputProps) => {
  const { getFieldProps, setFieldValue } = useFormikContext<MazeFormValues>();

  const handleChange = (row: number, col: number) => {
    const newCoordinate: Coordinate = { row, col };
    setFieldValue(name, newCoordinate);
  };

  return (
    <Col>
      {label}
      <Row>
        <Form.Group className="col">
          <Form.Label>Row</Form.Label>
          <Form.Control
            id={name}
            name={name}
            type="number"
            min={0}
            max={maxRow}
            value={(getFieldProps(name).value as Coordinate).row}
            onChange={(event) =>
              handleChange(
                +event.target.value,
                (getFieldProps(name).value as Coordinate).col,
              )
            }
            onBlur={getFieldProps(name).onBlur}
          />
        </Form.Group>
        <Form.Group className="col">
          <Form.Label>Column</Form.Label>
          <Form.Control
            id={name}
            name={name}
            type="number"
            min={0}
            max={maxColumn}
            value={(getFieldProps(name).value as Coordinate).col}
            onChange={(event) =>
              handleChange(
                (getFieldProps(name).value as Coordinate).row,
                +event.target.value,
              )
            }
            onBlur={getFieldProps(name).onBlur}
          />
        </Form.Group>
      </Row>
    </Col>
  );
};

export default CoordinateInput;
