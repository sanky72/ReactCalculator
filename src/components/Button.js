import React from "react";
import "./calculator.css";
import Theme from "./Theme";
const Button = (props) => {
  let { rowElements, isDarkTheme } = props;
  return (
    <div
      onClick={() => props.onClick(props.children)}
      className={`buttonDesign${isDarkTheme ? "Dark" : ""}`}
      style={{
        width: `${100 / (rowElements ? rowElements : 4)}%`,
        cursor: "pointer",
      }}
    >
      {props.children}
    </div>
  );
};

export default Theme(Button);
