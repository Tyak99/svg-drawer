import * as React from "react";
import "./shapes.css";

type CircleProps = {
  item: {
    color: string;
    radius: string;
    index: number;
  };
  updateShape: Function;
  deleteShape: Function;
};

const CircleDetails = (props: CircleProps) => {
  return (
    <div style={{ width: "1000px", margin: "2rem auto" }}>
      <div className="shape">
        <p> Circle </p>
        <div className="items">
          <div className="item">
            <p> Fill color </p>
            <input
              type="text"
              onChange={(e) => props.updateShape(e, props.item.index)}
              name="color"
              defaultValue={props.item.color}
            />
          </div>
          <div className="item">
            <p> Radius </p>
            <input
              type="text"
              value={props.item.radius}
              name="radius"
              onChange={(e) => props.updateShape(e, props.item.index)}
            />
          </div>
        </div>
        <button onClick={() => props.deleteShape(props.item.index)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CircleDetails;
