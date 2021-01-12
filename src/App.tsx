import React, { useState } from "react";
import "./App.css";
import Circle from "./components/Circle";
import Sandbox from "./components/Sandbox/sandbox";
import Header from "./components/Header";
import Rectangle from "./components/Rectangle";
import { Button } from "reactstrap";
import Line from "./components/Line";
import CircleDetails from "./components/ShapesDetails/CircleDetails";
import RectDetails from "./components/ShapesDetails/RectDetails";

interface IAllDataPoints {
  x: string;
  y: any;
  radius?: string;
  height?: string;
  width?: string;
  name: string;
  color: string;
}

interface ILineDataPoint {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  stroke: string;
}

function App() {
  const [allDatapoint, setAllDatapoint] = useState<IAllDataPoints[] | null>([]);

  const [lineDatapoints, setLineDatapoint] = useState<ILineDataPoint[] | null>(
    []
  );

  const createCircle = () => {
    const x = Math.floor(Math.random() * Math.floor(500)).toString();
    const y = Math.floor(Math.random() * Math.floor(500)).toString();

    const all = [
      ...allDatapoint,
      { x, y, radius: "50", color: "black", name: "circle" },
    ];
    setAllDatapoint(all);
  };

  const createLine = () => {
    const x1 = Math.floor(Math.random() * Math.floor(500)).toString();
    const x2 = Math.floor(Math.random() * Math.floor(500)).toString();
    const y1 = Math.floor(Math.random() * Math.floor(500)).toString();
    const y2 = Math.floor(Math.random() * Math.floor(500)).toString();

    const all = [...lineDatapoints, { x1, x2, y1, y2, stroke: "black" }];

    setLineDatapoint(all);
  };

  const createRectangle = () => {
    const x = Math.floor(Math.random() * Math.floor(500)).toString();
    const y = Math.floor(Math.random() * Math.floor(500)).toString();

    const all = [
      ...allDatapoint,
      {
        x,
        y,
        size: "50",
        name: "rect",
        height: "50",
        width: "50",
        color: "black",
      },
    ];
    setAllDatapoint(all);
  };

  const updateShape = (
    e: { target: { name: string; value: string } },
    index: number
  ) => {
    const { name, value } = e.target;
    console.log('🚀 ~ file: App.tsx ~ line 108 ~ App ~ name', name, value, index)
    if (!allDatapoint) return;
    const shapes = [...allDatapoint];
    const foundCircle = {
      ...shapes[index],
      [name]: value,
    };
    shapes[index] = foundCircle;
    console.log(
      "🚀 ~ file: App.tsx ~ line 123 ~ updateShape ~ circles",
      shapes
    );
    setAllDatapoint(shapes);
  };

  const renderShapeDetails = () => {
    if (!allDatapoint || allDatapoint.length < 1) return;
    return allDatapoint.map((item, i) => {
      if (item.name === "circle") {
        const circleItem = {
          index: i,
          radius: item.radius || "50",
          color: item.color,
        };
        return (
          <CircleDetails
            item={circleItem}
            updateShape={updateShape}
            deleteShape={deleteShape}
            key={i}
          />
        );
      } else if (item.name === "rect") {
        const rectItem = {
          index: i,
          width: item.width || "50",
          color: item.color,
          height: item.height || "50",
        };
        return (
          <RectDetails
            item={rectItem}
            updateShape={updateShape}
            deleteShape={deleteShape}
            key={i}
          />
        );
      }
      return false;
    });
  };

  const deleteShape = (shape: string, index: number) => {
    if (!allDatapoint) return;
    const updatedDataPoints = [...allDatapoint].filter((item, i) => {
      return i !== index;
    });
    setAllDatapoint(updatedDataPoints);
  };

  const renderShapes = () => {
    if (!allDatapoint || allDatapoint.length < 1) return;
    return allDatapoint.map((item, i) => {
      if (item.name === "rect") {
        return (
          <Rectangle
            x={item.x}
            y={item.y}
            key={i}
            width={item.width || "50"}
            height={item.height || "50"}
            color={item.color}
          />
        );
      } else {
        return (
          <Circle
            cx={item.x}
            cy={item.y}
            key={i}
            r={item.radius || "50"}
            color={item.color}
          />
        );
      }
    });
  };

  const renderLine = () => {
    if (!lineDatapoints || lineDatapoints.length < 1) return;
    return lineDatapoints.map((item, i) => {
      return (
        <Line
          x1={item.x1}
          y1={item.y1}
          x2={item.x2}
          y2={item.y2}
          stroke="black"
          key={i}
        />
      );
    });
  };

  return (
    <div className="App">
      <Header />
      <Sandbox>
        {allDatapoint.length < 1 && (
          <text x="450" y="300">
            Your drawing is empty
          </text>
        )}
        {renderShapes()}
        {/* {renderLine()} */}
      </Sandbox>
      <div className="actions">
        <Button onClick={() => createCircle()} color="primary">
          Add Circle
        </Button>
        <Button onClick={() => createLine()} color="primary">
          Add Line
        </Button>
        <Button onClick={() => createRectangle()} color="primary">
          Add Rectangle
        </Button>
      </div>

      <div style={{ width: "1000px", margin: "2rem auto" }}>
        {renderShapeDetails()}
      </div>

      <div className="disclaimer">
        <h3> Note </h3>
        <p>
          You can drag a shape across the view to change position :)
        </p>
      </div>
    </div>
  );
}

export default App;
