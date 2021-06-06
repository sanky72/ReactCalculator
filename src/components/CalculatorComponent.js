import React, { useState, useEffect } from "react";
import Button from "./Button";
import Display from "./Display";
import {
  simpleCalculatorButtons,
  modifyLayoutButtons,
  scientificButtons,
} from "../Constants/CalculatorConstants";
import "./calculator.css";
function CalculatorComponent() {
  const [currentStack, setCurrentStack] = useState([]);
  const [scientificModeFlag, setSceintificModeFlag] = useState(false);

  const renderSimpleCalculatorRow = (array, callback = () => {}) => {
    //this method is helpful when you have same callback for every button of that row.
    // as that case is not common, so I have not created it as a separate component
    return (
      <div className="calculatorRow">
        {Array.isArray(array) &&
          array.map((item, index) => (
            <Button rowElements={array.length} onClick={callback}>
              {item}
            </Button>
          ))}
      </div>
    );
  };

  const scientificBlock = () => {
    return renderSimpleCalculatorRow(
      scientificButtons,
      scientificButtonsCallback
    );
  };

  const layoutModifiers = (button) => {
    if (button === "Scientific Mode") {
      setSceintificModeFlag(!scientificModeFlag);
    }
  };

  const numberInputHandler = (num) => {
    const len = currentStack.length;
    const temp = [...currentStack];
    if (!len || isNaN(currentStack[len - 1])) {
      temp.push(num);
    } else {
      temp[len - 1] = temp[len - 1] + "" + num;
    }
    setCurrentStack(temp);
  };

  const equalToButtonHandler = () => {
    const len = currentStack.length;
    let temp = [...currentStack];
    if (len === 3) {
      const ans = eval(temp.join(""));
      temp = [ans];
      setCurrentStack(temp);
    } else {
      alert("not enough elements");
    }
  };
  const operatorInputHandler = (input) => {
    const operator = input[input.length - 2];
    const len = currentStack.length;
    let temp = [...currentStack];
    if (len == 0) {
      alert("please give an operand first");
      return;
    }
    if (isNaN(temp[len - 1])) {
      temp[len - 1] = operator;
    } else {
      if (len === 1) {
        temp.push(operator);
      } else {
        const ans = eval(temp.join(""));
        temp = [ans, operator];
      }
    }
    setCurrentStack(temp);
  };
  const calculatorButtonsCallback = (button) => {
    const isNumber = !isNaN(button);
    if (isNumber) {
      numberInputHandler(button);
    } else {
      if (button === "Clear") {
        setCurrentStack([]);
      } else if (button === "=") {
        equalToButtonHandler();
      } else {
        operatorInputHandler(button);
      }
    }
  };
  const scientificButtonsCallback = (button) => {
    const len = currentStack.length;
    const temp = [...currentStack];
    if (!len) {
      alert(`to ${button} please give an operand`);
    } else if (isNaN(currentStack[len - 1])) {
      alert(
        "your previous click was a operator, please give an operand as the input"
      );
    } else {
      if (button === "Sign") {
        temp[len - 1] = -1 * temp[len - 1] + "";
      } else if (button === "Square") {
        temp[len - 1] = temp[len - 1] * temp[len - 1] + "";
      } else {
        temp[len - 1] = Math.sqrt(temp[len - 1]);
      }

      setCurrentStack(temp);
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <div
        className="calculatorParent"
        style={{ height: `${scientificModeFlag ? 50 * 7 : 300}px` }}
      >
        <Display val={currentStack[2] || currentStack[0]} />
        {renderSimpleCalculatorRow(modifyLayoutButtons, layoutModifiers)}
        {scientificModeFlag && scientificBlock()}
        {simpleCalculatorButtons.map((item) =>
          renderSimpleCalculatorRow(item, calculatorButtonsCallback)
        )}
      </div>
    </div>
  );
}

export default CalculatorComponent;
