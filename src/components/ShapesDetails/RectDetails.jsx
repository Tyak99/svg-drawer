import * as React from "react";
import "./shapes.css";

type RectProps = {
  item: {
    color: string,
    width: string,
    height: String,
    index: number,
  },
  updateShape: Function,
  deleteShape: Function,
};

const RectDetails = (props: RectProps) => {
  return (
    <div className="shape">
      <p> Rectangle </p>
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
          <p> Width </p>
          <input
            type="text"
            value={props.item.width}
            name="width"
            onChange={(e) => props.updateShape(e, props.item.index)}
          />
        </div>
        <div className="item">
          <p> Height </p>
          <input
            type="text"
            value={props.item.height}
            name="height"
            onChange={(e) => props.updateShape(e, props.item.index)}
          />
        </div>
      </div>
      <button onClick={() => props.deleteShape(props.item.index)}>
        Delete
      </button>
    </div>
  );
};

export default RectDetails;
