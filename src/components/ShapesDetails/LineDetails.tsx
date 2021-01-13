import * as React from "react";
import "./shapes.css";

type LineProps = {
  item: {
    x1: string;
    x2: string;
    y1: string;
    y2: string;
    stroke: string;
    index: number;
    strokeWidth: string;
  };
  updateShape: Function;
  deleteShape: Function;
};

const LineDetails = (props: LineProps) => {
  return (
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
          <div className="item">
            <p> Thickness </p>
            <input
              type="text"
              value={props.item.strokeWidth}
              name="strokeWidth"
              onChange={(e) => props.updateShape(e, props.item.index)}
            />
          </div>
        </div>
        <button onClick={() => props.deleteShape(props.item.index)}>Delete</button>
      </div>
  );
};

export default LineDetails;
