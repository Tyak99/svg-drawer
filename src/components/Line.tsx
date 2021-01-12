import * as React from "react";
import * as d3Drag from "d3-drag";
import * as d3Selection from "d3-selection";

const Line: React.FunctionComponent<{
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  stroke: string;
}> = (props) => {
  const myRef = React.useRef<SVGLineElement | null>(null);

  React.useEffect(() => {
    const drag = () => {
      function dragstarted(event: { x: string; y: string }) {}

      function dragged(event: { x: string; y: string }) {
        console.log("🚀 ~ file: Line.tsx ~ line 18 ~ dragged ~ event", event);
        const line = d3Selection
          .select(myRef.current)
          .classed("dragging", true);
        line.attr("cx", event.x).attr("cy", event.y);
      }

      function dragended(event: object) {}

      return d3Drag
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };
    if (!myRef.current) return;
    d3Selection.select(myRef.current).call(drag());
  }, []);

  React.useEffect(() => {
    // if ()
  }, []);

  return (
    <svg>
      <line x1={props.x1} y1={props.y1} x2={props.x2} y2={props.y2} stroke={props.stroke} />
    </svg>
  );
};

export default Line;
