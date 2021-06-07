import React from "react";
import "./calculator.css";
import Theme from "./Theme";
const Display = ({ val, isDarkTheme }) => {
  const displayValue = val
    ? val.includes("e")
      ? val
      : val.match(/.{1,3}/g).join(",")
    : 0;
  return (
    <div className={`display${isDarkTheme ? "Dark" : ""}`}>
      <span className="display__span">{displayValue}</span>
    </div>
  );
};

export default Theme(Display);
