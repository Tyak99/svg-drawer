import * as React from "react";
import "./sandbox.css";

const Sandbox: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <div style={{ marginTop: "2rem" }}>
      <svg viewBox="0 0 1000 600" width="1000" height="600">
        {children}
      </svg>
    </div>
  );
};

export default Sandbox;
