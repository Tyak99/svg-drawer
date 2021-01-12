import React, { useState } from "react";
import "./App.css";
import Circle from "./components/Circle";
import Sandbox from "./components/Sandbox/sandbox";
import Header from "./components/Header";
import Rectangle from "./components/Rectangle";
import * as d3Selection from "d3-selection";
import { Button } from "reactstrap";

interface ICircleDataPoints {
  x: string
  y: any
  r: string
}

interface IRectDataPoint {
  x: string
  y: any
  size: string
}

function App() {
  const [circleDatapoint, setcircleDatapoint] = useState<ICircleDataPoints[] | null>([]);

  const [rectDatapoints, setRectDatapoints] = useState<IRectDataPoint[] | null>([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [currentSelected, setCurrentSelected] = useState<HTMLDivElement | null>(null);

  const createCircle = () => {
    const x = Math.floor(Math.random() * Math.floor(500)).toString();
    const y = Math.floor(Math.random() * Math.floor(500)).toString();

    const all = [...circleDatapoint, { x, y, r: "50" }];

    setcircleDatapoint(all);
  };

  const createRectangle = () => {
    const x = Math.floor(Math.random() * Math.floor(500)).toString();
    const y = Math.floor(Math.random() * Math.floor(500)).toString();

    const all = [...rectDatapoints, { x, y, size: "50" }];

    setRectDatapoints(all);
  };

  const clickHandler = (current: any) => {
    setCurrentSelected(current);
  };

  const changeColor = (color: string) => {
    d3Selection.select(currentSelected).attr("fill", color);
  };

  const changeSize = (size: string) => {
    if (!currentSelected) return;
    if (currentSelected.tagName === "circle") {
      d3Selection.select(currentSelected).attr("r", size);
    } else if (currentSelected.tagName === "rect") {
      d3Selection
        .select(currentSelected)
        .attr("height", size)
        .attr("width", size);
    }
  };

  const renderCircles = () => {
    if (!circleDatapoint || circleDatapoint.length < 1) return;
    return (
      circleDatapoint.map((item, i) => {
        return (
          <Circle
            cx={item.x}
            cy={item.y}
            key={i}
            currentItem={clickHandler}
            r={item.r}
          />
        );
      })
    )
  }

  const renderRects = () => {
    if (!rectDatapoints || rectDatapoints.length < 1) return;
    return (
      rectDatapoints.map((item, i) => {
        return (
          <Rectangle
            x={item.x}
            y={item.y}
            key={i}
            currentItem={clickHandler}
            size={item.size}
          />
        );
      })
    )
  }
  return (
    <div className="App">
      <Header />
      <Sandbox>
        {circleDatapoint.length < 1 && rectDatapoints.length < 1 && (
          <text x="450" y="300">
            Your drawing is empty
          </text>
        )}
        {renderCircles()}
        {renderRects()}
      </Sandbox>
      <div className="actions">
        <Button onClick={() => createCircle()} color='primary'>Add Circle</Button>
        <Button onClick={() => createRectangle()} color='primary'>Add Line</Button>
        <Button onClick={() => createRectangle()} color='primary'>Add Rectangle</Button>
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

      <div className="disclaimer">
        <h2> Disclaimer </h2>
        <p> All shapes are editable, click the shape and use the form presented to you to edit </p>
      </div>
    </div>
  );
}

export default App;
