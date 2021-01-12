import * as React from "react";
import * as d3Drag from "d3-drag";
import * as d3Selection from "d3-selection";

const Rectangle: React.FunctionComponent<{
  cx: string;
  cy: string;
  size: string;
  currentItem: Function
}> = (props) => {
  const myRef = React.useRef(null);

  React.useEffect(() => {
    console.log("🚀 ~ file: Reactagle.tsx ~ line 14 ~ handleDrag ~ me");
    const drag = () => {
      function dragstarted(event: { x: string; y: string }) {
        console.log("🚀 ~ file: Reactagle.tsx ~ line 18 ~ dragstarted ~ event");
      }

      function dragged(event: { x: string; y: string }) {
        console.log("🚀 ~ file: Reactagle.tsx ~ line 24 ~ dragged ~ event", event.x, event.y);
        const rect = d3Selection
          .select(myRef.current)
          .classed("dragging", true);
        rect.attr("x", event.x).attr("y", event.y);
      }

      function dragended(event: object) {
        console.log(
          "🚀 ~ file: Reactagle.tsx ~ line 29 ~ dragended ~ event",
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

  return (
    <svg>
      <rect x={props.x} y={props.y} width={props.size} height={props.size} ref={myRef} onClick={() => props.currentItem(myRef.current)} />
    </svg>
  );
};

export default Rectangle;
