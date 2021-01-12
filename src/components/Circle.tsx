import * as React from "react";
import * as d3Drag from "d3-drag";
import * as d3Selection from "d3-selection";
import * as d3Dispatch from "d3-dispatch";
import ReactDOM from "react-dom";

const Circle: React.FunctionComponent<{
  cx: string;
  cy: string;
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
    d3Drag.drag().on("drag", function () {
      // const me = d3Selection.select(this);
      console.log("I am cragging");
      // me.attr('x', d3Dispatch.event.x);
      // me.attr('y', d3Dispatch.event.y);
    });
    // const node = ReactDOM.findDOMNode(this);
    // handleDrag(d3Selection.select(node));
    if (!myRef.current) return;
    d3Selection.select(myRef.current).call(drag());
  }, []);

  return (
    <svg>
      <circle cx={props.cx} cy={props.cy} r="50" ref={myRef} />
    </svg>
  );
};

export default Circle;
