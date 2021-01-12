import * as React from "react";
import * as d3Drag from "d3-drag";
import * as d3Selection from "d3-selection";
import "./shapes.css";

const Shapes: React.FunctionComponent<{}> = (props) => {
  return (
    <div style={{ width: "1000px", margin: '2rem auto' }}>
      <div className="shape">
        <p> Rectangle </p>
        <div className="items">
          <div className="item">
            <p> Fill color </p>
            <input type="text" />
          </div>
          <div className="item">
            <p> Width </p>
            <input type="text" />
          </div>
          <div className="item">
            <p> Height </p>
            <input type="text" />
          </div>
        </div>
        <p> delete </p>
      </div>
    </div>
  );
};

export default Shapes;
