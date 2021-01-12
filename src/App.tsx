import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Circle from "./components/Circle";
import Sandbox from "./components/Sandbox/sandbox";
import Header from "./components/Header";
import Rectangle from "./components/Rectangle";
import * as d3Selection from "d3-selection";

function App() {
  const [circleDatapoint, setcircleDatapoint] = useState([]);

  const [rectDatapoints, setRectDatapoints] = useState([]);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [currentSelected, setCurrentSelected] = useState(null);

  const clickHandler = () => {
    const x = Math.floor(Math.random() * Math.floor(500)).toString();
    const y = Math.floor(Math.random() * Math.floor(500)).toString();

    const all = [...circleDatapoint, { x, y, r: "50" }];

    setcircleDatapoint(all);
  };

  const createRectangle = () => {
    const x = Math.floor(Math.random() * Math.floor(500)).toString();
    const y = Math.floor(Math.random() * Math.floor(500)).toString();

    const all = [...rectDatapoints, { x, y, size: '50' }];

    setRectDatapoints(all);
  };

  const getCurrent = (current: any) => {
    console.log(
      "🚀 ~ file: App.tsx ~ line 33 ~ getCurrent ~ current",
      current.tagName
    );
    setCurrentSelected(current);
  };

  const changeColor = (color: string) => {
    d3Selection.select(currentSelected).attr("fill", color);
  };

  const changeSize = (size: string) => {
    if (currentSelected.tagName === "circle") {
      d3Selection.select(currentSelected).attr("r", size);
    } else if (currentSelected.tagName === "rect") {
      d3Selection.select(currentSelected).attr("height", size).attr('width', size);
    }
  };

  return (
    <div className="App">
      <Header />
      <Sandbox>
        {circleDatapoint.map((item, i) => {
          return (
            <Circle
              cx={item.x}
              cy={item.y}
              key={i}
              currentItem={getCurrent}
              r={item.r}
            />
          );
        })}
        {rectDatapoints.map((item, i) => {
          return (
            <Rectangle
              x={item.x}
              y={item.y}
              key={i}
              currentItem={getCurrent}
              size={item.size}
            />
          );
        })}
      </Sandbox>
      <div className="actions">
        <button onClick={() => clickHandler()}> Add Circle </button>
        <button onClick={() => createRectangle()}> Add Rectangle </button>
        {/* <button>Add Line</button> */}
      </div>

      {currentSelected && (
        <>
          <div>
            <p> Change color </p>
            <input type="text" onChange={(e) => setColor(e.target.value)} />
            <button onClick={() => changeColor(color)}> Submit </button>
          </div>
          <div>
            <p> Change Size </p>
            <input type="text" onChange={(e) => setSize(e.target.value)} />
            <button onClick={() => changeSize(size)}> Submit </button>
          </div>
        </>
      )}

      <p> Please add shapes </p>
      <p> To edit a shape, select it and use the input you see above</p>
    </div>
  );
}

export default App;
