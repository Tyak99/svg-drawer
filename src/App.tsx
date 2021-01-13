import React, { useState } from "react";
import "./App.css";
import Circle from "./components/Shapes/Circle";
import Sandbox from "./components/Sandbox/sandbox";
import Header from "./components/Header";
import Rectangle from "./components/Shapes/Rectangle";
import Line from "./components/Shapes/Line";
import CircleDetails from "./components/ShapesDetails/CircleDetails";
import RectDetails from "./components/ShapesDetails/RectDetails";
import LineDetails from "./components/ShapesDetails/LineDetails";

interface IAllDataPoints {
  x: string;
  y: string;
  x2?: string;
  y2?: string;
  stroke?: string;
  strokeWidth?: string;
  radius?: string;
  height?: string;
  width?: string;
  name: string;
  color: string;
}

const randomNumber = () => {
  return Math.floor(Math.random() * Math.floor(500)).toString()
};

function App() {
  const [allDatapoint, setAllDatapoint] = useState<IAllDataPoints[] | null>([]);

  const createCircle = () => {
    const x = randomNumber();
    const y = randomNumber();

    const all = [
      ...allDatapoint,
      { x, y, radius: "50", color: "black", name: "circle" },
    ];
    setAllDatapoint(all);
  };

  const createLine = () => {
    const x1 = randomNumber();
    const x2 = randomNumber();
    const y1 = randomNumber();
    const y2 = randomNumber();

    const all = [...allDatapoint, { x: x1, x2, y: y1, y2, stroke: "black", strokeWidth: '1', name: 'lines' }];

    setAllDatapoint(all);
  };

  const createRectangle = () => {
    const x = randomNumber();
    const y = randomNumber();

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
    if (!allDatapoint) return;
    const shapes = [...allDatapoint];
    const foundShape = {
      ...shapes[index],
      [name]: value,
    };
    shapes[index] = foundShape;
    setAllDatapoint(shapes);
  };

  const renderShapeDetails = () => {
    if (!allDatapoint || allDatapoint.length < 1) {
      return (
        <p> You have not added any shapes </p>
      )
    };
    return allDatapoint.map((item, i) => {
      if (item.name === "circle") {
        const circleItem = {
          index: i,
          radius: item.radius,
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
          width: item.width,
          color: item.color,
          height: item.height,
        };
        return (
          <RectDetails
            item={rectItem}
            updateShape={updateShape}
            deleteShape={deleteShape}
            key={i}
          />
        );
      } else {
        const lineItem = {
          index: i,
          x1: item.x,
          y1: item.y,
          x2: item.x2,
          y2: item.y2,
          stroke: item.stroke,
          strokeWidth: item.strokeWidth
        }
        return (
          <LineDetails
            item={lineItem}
            updateShape={updateShape}
            deleteShape={deleteShape}
            key={i}
          />
        )
      }
    });
  };

  const deleteShape = (index: number) => {
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
      } else if (item.name === "circle") {
        return (
          <Circle
            cx={item.x}
            cy={item.y}
            key={i}
            r={item.radius || "50"}
            color={item.color}
          />
        );
      } else {
        return (
          <Line
            x1={item.x}
            x2={item.x2 || '100'}
            y1={item.y}
            y2={item.y2 || '50'}
            stroke={item.stroke || 'black'}
            strokeWidth={item.strokeWidth || '1'}
            key={i}
          />
        );
      }
    });
  };

  return (
    <div className="App">
      <Header />
      <Sandbox>
        {allDatapoint && allDatapoint.length < 1 && (
          <text x="450" y="300">
            Your drawing is empty
          </text>
        )}
        {renderShapes()}
      </Sandbox>
      <div className="actions">
        <button onClick={() => createCircle()} color="primary">
          Add Circle
        </button>
        <button onClick={() => createLine()} color="primary">
          Add Line
        </button>
        <button onClick={() => createRectangle()} color="primary">
          Add Rectangle
        </button>
      </div>

      <div style={{ width: "1000px", margin: "2rem auto" }}>
        <h3> Shapes </h3>
        {renderShapeDetails()}
      </div>

      <div className="disclaimer">
        <h3> Note </h3>
        <p>You can drag a shape across the view to change position :)</p>
      </div>
    </div>
  );
}

export default App;
