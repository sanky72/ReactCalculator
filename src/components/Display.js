import React from "react";
import "./calculator.css";
import Theme from "./Theme";
const Display = ({ val, isDarkTheme }) => {
  return (
    <div className={`display${isDarkTheme ? "Dark" : ""}`}>
      <span className="display__span">
        {val ? val.match(/.{1,3}/g).join(",") : 0}
      </span>
    </div>
  );
};

export default Theme(Display);
