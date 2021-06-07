import React, { useState } from "react";
import Button from "./Button";
import Display from "./Display";
import Theme from "./Theme";
import {
  simpleCalculatorButtons,
  modifyLayoutButtons,
  scientificButtons,
} from "../Constants/CalculatorConstants";
import "./calculator.css";

function CalculatorComponent({ setTheme, isDarkTheme }) {
  const [currentStack, setCurrentStack] = useState([]);
  const [scientificModeFlag, setScientificModeFlag] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  const renderSimpleCalculatorRow = (array, callback = () => {}) => {
    //this method is helpful when you have same callback for every button of that row.
    // as that case is not common, so I have not created it as a separate component
    return (
      <div className={`calculatorRow${isDarkTheme ? "Dark" : ""}`}>
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
      setScientificModeFlag(!scientificModeFlag);
    } else if (button === "Dark Theme") {
      setTheme("Dark");
    } else {
      setTheme("Light");
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
    setDisplayValue(temp[temp.length - 1]);
  };

  const equalToButtonHandler = () => {
    const len = currentStack.length;
    let temp = [...currentStack];
    if (len === 3) {
      const ans = eval(temp.join(""));
      temp = [ans];
      setCurrentStack([]);
      setDisplayValue(ans);
    } else {
      alert("not enough elements");
    }
  };

  const operatorInputHandler = (input) => {
    const operator = input[input.length - 2];
    const len = currentStack.length;
    let temp = [...currentStack];
    if (len === 0) {
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
        setDisplayValue(ans);
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
        setDisplayValue(0);
      } else if (button === "=") {
        equalToButtonHandler();
      } else {
        operatorInputHandler(button);
      }
    }
  };

  const scientificButtonsCallback = (button) => {
    let tempDisplayValue = displayValue;

    if (button === "Sign") {
      tempDisplayValue = -1 * tempDisplayValue + "";
    } else if (button === "Square") {
      tempDisplayValue = tempDisplayValue * tempDisplayValue + "";
    } else {
      tempDisplayValue = Math.sqrt(tempDisplayValue);
    }

    setDisplayValue(tempDisplayValue);
    setCurrentStack([]);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div
        className={`calculatorParent${isDarkTheme ? "Dark" : ""}`}
        style={{ height: `${scientificModeFlag ? 50 * 7 : 300}px` }}
      >
        <Display val={displayValue} />
        {renderSimpleCalculatorRow(modifyLayoutButtons, layoutModifiers)}
        {scientificModeFlag && scientificBlock()}
        {simpleCalculatorButtons.map((item) =>
          renderSimpleCalculatorRow(item, calculatorButtonsCallback)
        )}
      </div>
    </div>
  );
}

export default Theme(CalculatorComponent);
