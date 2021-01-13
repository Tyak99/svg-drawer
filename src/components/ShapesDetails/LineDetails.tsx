import * as React from "react";
import { Button } from "reactstrap";
import "./shapes.css";

type LineProps = {
  item: {
    x1: string;
    x2: string;
    y1: string;
    y2: string;
    stroke: string;
    index: number;
  };
  updateShape: Function;
  deleteShape: Function;
};

const LineDetails = (props: LineProps) => {
  return (
    <div style={{ width: "1000px", margin: "2rem auto" }}>
      <div className="shape">
        <p> Line </p>
        <div className="items">
          <div className="item">
            <p> Stroke color </p>
            <input
              type="text"
              onChange={(e) => props.updateShape(e, props.item.index)}
              name="stroke"
              defaultValue={props.item.stroke}
            />
          </div>
          <div className="item">
            <p> X1 </p>
            <input
              type="text"
              value={props.item.x1}
              name="x1"
              onChange={(e) => props.updateShape(e, props.item.index)}
            />
          </div>
          <div className="item">
            <p> Y1 </p>
            <input
              type="text"
              value={props.item.y1}
              name="y1"
              onChange={(e) => props.updateShape(e, props.item.index)}
            />
          </div>
          <div className="item">
            <p> X12</p>
            <input
              type="text"
              value={props.item.x2}
              name="x2"
              onChange={(e) => props.updateShape(e, props.item.index)}
            />
          </div>
          <div className="item">
            <p> Y2 </p>
            <input
              type="text"
              value={props.item.y2}
              name="y2"
              onChange={(e) => props.updateShape(e, props.item.index)}
            />
          </div>
        </div>
        <Button
          color="danger"
          onClick={() => props.deleteShape(props.item.index)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default LineDetails;
