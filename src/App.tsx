import React, { useState } from "react";
import "./App.css";
import Circle from "./components/Circle";
import Sandbox from "./components/Sandbox/sandbox";
import Header from "./components/Header";
import Shapes from "./components/Shapes";
import Rectangle from "./components/Rectangle";
import * as d3Selection from "d3-selection";
import { Button, FormGroup, Input, Label } from "reactstrap";
import Line from "./components/Line";

interface ICircleDataPoints {
  x: string;
  y: any;
  r: string;
  color: string;
}

interface IRectDataPoint {
  x: string;
  y: any;
  size: string;
}

interface ILineDataPoint {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  stroke: string;
}

function App() {
  const [circleDatapoint, setcircleDatapoint] = useState<
    ICircleDataPoints[] | null
  >([]);

  const [lineDatapoints, setLineDatapoint] = useState<ILineDataPoint[] | null>(
    []
  );

  const [rectDatapoints, setRectDatapoints] = useState<IRectDataPoint[] | null>(
    []
  );
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [currentSelected, setCurrentSelected] = useState<HTMLDivElement | null>(
    null
  );

  const createCircle = () => {
    const x = Math.floor(Math.random() * Math.floor(500)).toString();
    const y = Math.floor(Math.random() * Math.floor(500)).toString();

    const all = [...circleDatapoint, { x, y, r: "50", color: 'black' }];

    setcircleDatapoint(all);
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
    return circleDatapoint.map((item, i) => {
      return (
        <Circle
          cx={item.x}
          cy={item.y}
          key={i}
          currentItem={clickHandler}
          r={item.r}
          color={item.color}
        />
      );
    });
  };

  const updateCircle = (e, index: number) => {
    console.log('🚀 ~ file: App.tsx ~ line 127 ~ updateCircle ~ e', e.target.name)
    const { name, value } = e.target;
    if (!circleDatapoint) return;
    const circles = [...circleDatapoint];
    const foundCircle = {
      ...circles[index],
      [name]: value
    };
    circles[index] = foundCircle;
    console.log('🚀 ~ file: App.tsx ~ line 123 ~ updateCircle ~ circles', circles)
    setcircleDatapoint(circles);
  }

  const renderCircleDetails  = () => {
    if (!circleDatapoint || circleDatapoint.length < 1) return;
    // return circleDatapoint.map((item, i) => {
    //   return (
    //   <div className="shape">
    //       <p> Rectangle </p>
    //       <div className="items">
    //         <div className="item">
    //           <p> Fill color </p>
    //           <input type="text" onChange={(e) => updateCircle(e, i)} name='color' defaultValue={item.color} />
    //         </div>
    //         <div className="item">
    //           <p> Size </p>
    //           <input type="text" value={item.r} name='r' onChange={(e) => updateCircle(e, i)} />
    //         </div>
    //       </div>
    //       <button onClick={() => deleteShape('circle', i)}> delete </button>
    //       <p> delete </p>
    //     </div>
    //     )
    // })

    return [...circleDatapoint, ...rectDatapoints].map((item, i) => {
      if (item.name === 'circle') {
        return (
          <div className="shape">
          <p> Circle </p>
          <div className="items">
            <div className="item">
              <p> Fill color </p>
              <input type="text" onChange={(e) => updateCircle(e, i)} name='color' defaultValue={item.color} />
            </div>
            <div className="item">
              <p> Size </p>
              <input type="text" value={item.r} name='r' onChange={(e) => updateCircle(e, i)} />
            </div>
          </div>
          <button onClick={() => deleteShape('circle', i)}> delete </button>
          <p> delete </p>
        </div>
        )
      } else if (item.name === 'rect') {
        return (
          <div className="shape">
          <p> Rectangle </p>
          <div className="items">
            <div className="item">
              <p> Fill color </p>
              <input type="text" onChange={(e) => updateCircle(e, i)} name='color' defaultValue={item.color} />
            </div>
            <div className="item">
              <p> Width </p>
              <input type="text" value={item.r} name='r' onChange={(e) => updateCircle(e, i)} />
            </div>
          </div>
          <button onClick={() => deleteShape('circle', i)}> delete </button>
          <p> delete </p>
        </div>
        )
      }
    })
  }

  const deleteShape = (shape: string, index: number) => {
    if (!circleDatapoint && !rectDatapoints) return;
    if (shape === 'circle') {
      const circles = [...circleDatapoint].filter((item, i) => {
        return i !== index
      })
      setcircleDatapoint(circles);
    }
  } 

  const renderRects = () => {
    if (!rectDatapoints || rectDatapoints.length < 1) return;
    return rectDatapoints.map((item, i) => {
      return (
        <Rectangle
          x={item.x}
          y={item.y}
          key={i}
          currentItem={clickHandler}
          size={item.size}
        />
      );
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
          currentItem={clickHandler}
        />
      );
    });
  };

  React.useEffect(() => {
    d3Selection
      .select(currentSelected)
      .attr("stroke", "red")
      .attr("stroke-width", "2");
  }, [currentSelected]);

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
        {renderLine()}
        {/* <Circle cx="150" cy="150" r="60" /> */}
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

      {/* {currentSelected && (
        <div className="forms">
          <div className="form-group">
            <p> Change color </p>
            <input type="text" onChange={(e) => setColor(e.target.value)} />
            <button onClick={() => changeColor(color)}> Submit </button>
          </div>
          <div className="form-group">
            <p> Change Size </p>
            <input type="text" onChange={(e) => setSize(e.target.value)} />
            <button onClick={() => changeSize(size)}> Submit </button>
          </div>
        </div>
      )} */}

      {/* <Shapes /> */}

      <div style={{ width: "1000px", margin: "2rem auto" }}>
        {renderCircleDetails()}
      </div>

      {/* <div className="disclaimer">
        <h2> Disclaimer </h2>
        <p>
          All shapes are editable, click the shape and use the form presented to
          you to edit
        </p>
      </div> */}
    </div>
  );
}

export default App;
