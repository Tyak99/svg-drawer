import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Circle from "./components/Circle";
import Sandbox from "./components/Sandbox/sandbox";
import Header from "./components/Header";
import Rectangle from "./components/Rectangle";

function App() {
  const [datapoints, setdatapoints] = useState([{ x: "300", y: "300" }]);

  const [rectDatapoints, setRectDatapoints] = useState([]);

  const clickHandler = () => {
    const x = Math.floor(Math.random() * Math.floor(500)).toString();
    const y = Math.floor(Math.random() * Math.floor(500)).toString();

    const all = [...datapoints, { x, y }];

    setdatapoints(all);
  };

  const createRectangle = () => {
    const x = Math.floor(Math.random() * Math.floor(500)).toString();
    const y = Math.floor(Math.random() * Math.floor(500)).toString();

    const all = [...rectDatapoints, { x, y }];

    setRectDatapoints(all);
  };

  return (
    <div className="App">
      <Header />
      <Sandbox>
        {datapoints.map((item, i) => {
          return <Circle cx={item.x} cy={item.y} key={i} />;
        })}
        {rectDatapoints.map((item, i) => {
          return <Rectangle x={item.x} y={item.y} key={i} />;
        })}
      </Sandbox>
      <div className="actions">
        <button onClick={() => clickHandler()}> Add Circle </button>
        <button onClick={() => createRectangle()}> Add Rectangle </button>
        <button>Add Line</button>
      </div>
    </div>
  );
}

export default App;
