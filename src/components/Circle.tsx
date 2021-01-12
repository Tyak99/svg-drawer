import * as React from "react";
import * as d3Drag from "d3-drag";
import * as d3Selection from "d3-selection";

const Circle: React.FunctionComponent<{
  cx: string;
  cy: string;
  r: string;
  currentItem: Function
}> = (props) => {
  const myRef = React.useRef(null);

  React.useEffect(() => {
    const drag = () => {
      function dragstarted(event: { x: string; y: string }) {
      }

      function dragged(event: { x: string; y: string }) {
        const circle = d3Selection
          .select(myRef.current)
          .classed("dragging", true);
        circle.attr("cx", event.x).attr("cy", event.y);
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

  React.useEffect(() => {
    // if ()
  }, [])

  return (
    <svg>
      <circle cx={props.cx} cy={props.cy} r={props.r} ref={myRef} onClick={() => props.currentItem(myRef.current)} fill='green'/>
    </svg>
  );
};

export default Circle;
