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
    console.log("🚀 ~ file: Circle.tsx ~ line 14 ~ handleDrag ~ me");
    const drag = () => {
      function dragstarted(event: { x: string; y: string }) {
        console.log("🚀 ~ file: Circle.tsx ~ line 18 ~ dragstarted ~ event");
      }

      function dragged(event: { x: string; y: string }) {
        console.log("🚀 ~ file: Circle.tsx ~ line 24 ~ dragged ~ event", event.x, event.y);
        const circle = d3Selection
          .select(myRef.current)
          .classed("dragging", true);
        circle.attr("cx", event.x).attr("cy", event.y);
      }

      function dragended(event: object) {
        console.log(
          "🚀 ~ file: Circle.tsx ~ line 29 ~ dragended ~ event",
          event
        );
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
