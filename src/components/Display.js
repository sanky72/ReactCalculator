import React from "react";
import "./calculator.css";
const Display = ({ val }) => {
  return (
    <div className="display">
      <span className="display__span">{val ? val : 0}</span>
    </div>
  );
};

export default Display;
