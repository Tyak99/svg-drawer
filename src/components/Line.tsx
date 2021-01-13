import * as React from "react";

const Line: React.FunctionComponent<{
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  stroke: string;
}> = (props) => {
  return (
    <svg>
      <line x1={props.x1} y1={props.y1} x2={props.x2} y2={props.y2} stroke={props.stroke} />
    </svg>
  );
};

export default Line;
