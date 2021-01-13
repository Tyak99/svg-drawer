import * as React from "react";
import * as d3Drag from "d3-drag";
import * as d3Selection from "d3-selection";

const Rectangle: React.FunctionComponent<{
  x: string;
  y: string;
  height: string;
  width: string;
  color: string;
}> = (props) => {
  const myRef = React.useRef<SVGRectElement | null>(null);

  React.useEffect(() => {
    const drag = () => {
      function dragstarted(event: { x: string; y: string }) {
      }

      function dragged(event: { x: string; y: string }) {
        const rect = d3Selection
          .select(myRef.current)
          .classed("dragging", true);
        rect.attr("x", event.x).attr("y", event.y);
      }

      function dragended(event: object) {
      }

      return d3Drag
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };
    if (!myRef.current) return;
    d3Selection.select(myRef.current).call(drag());
  }, []);

  return (
    <svg>
      <rect fill={props.color} x={props.x} y={props.y} width={props.width} height={props.height} ref={myRef}/>
    </svg>
  );
};

export default Rectangle;
