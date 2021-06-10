import React from "react";
import "./calculator.css";
import Theme from "./Theme";

const Display = ({ val, isDarkTheme }) => {
  return (
    <div className={`display${isDarkTheme ? "Dark" : ""}`}>
      <span className="display__span">{val}</span>
    </div>
  );
};

export default Theme(Display);
