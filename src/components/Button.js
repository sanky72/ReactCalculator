import React from "react";
import "./calculator.css";
const Button = (props) => {
  let { rowElements } = props;
  return (
    <div
      onClick={() => props.onClick(props.children)}
      className="buttonDesign"
      style={{
        width: `${100 / (rowElements ? rowElements : 4)}%`,
      }}
    >
      {props.children}
    </div>
  );
};

export default Button;
